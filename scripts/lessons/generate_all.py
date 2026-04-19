"""
Generate TTS audio for all lessons.

NEW approach (v2 — 2026-04-20):
  Each scene is generated as a SEPARATE TTS call, then concatenated with
  silent padding via ffmpeg:

    [2s pre-silence] + [scene audio] + [2s post-silence]  ← per scene

  Pattern in final audio: for each scene in order:
    — text appears on screen
    — 2s silence (child reads the text)
    — scene audio plays to completion
    — 2s silence (child digests)
    — transition to next scene

  This avoids sentence-boundary drift (edge-tts sometimes splits sentences
  differently than our Python list). Each scene's audio is exactly what we asked.

Scene durations stored in src/data/lessons.tsx must equal:
  PRE_MS + scene_audio_ms + POST_MS
"""

import asyncio
import io
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

import edge_tts

try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    FFMPEG = None
    print("ERROR: imageio-ffmpeg not installed. pip install imageio-ffmpeg")
    sys.exit(1)

VOICE = "kk-KZ-AigulNeural"
RATE = "-10%"          # Slower speech for 5-6 graders
PRE_MS = 2000          # Silence after text appears, before audio
POST_MS = 2000         # Silence after audio, before transition

# ─────────────────────────────────────────────────────────────────
# LESSONS — each key is output mp3 name, value is list of scenes,
# each scene is a list of sentences (Kazakh).
# ─────────────────────────────────────────────────────────────────
LESSONS = {
    "lesson-01-audio.mp3": [
        # Scene 1: greeting
        ["Сәлем, балалар!", "Бүгін біз математиканың ең бірінші тақырыбымен танысамыз — натурал сандар және амалдар."],
        # Scene 2: definition
        ["Натурал сан дегеніміз — заттарды санауға арналған сандар: бір, екі, үш, төрт, бес және әрі қарай."],
        # Scene 3: three rules
        ["Үш маңызды ережені есте сақтаңдар.", "Біріншіден, нөл натурал сан емес.", "Екіншіден, ең кіші натурал сан — бір.", "Үшіншіден, ең үлкен натурал сан жоқ, себебі олар шексіз."],
        # Scene 4: four operations
        ["Натурал сандармен төрт негізгі амал жасаймыз.", "Қосу: үш қосу екі — бес.", "Азайту: жеті минус төрт — үш.", "Көбейту: төртті үшке көбейтсек — он екі.", "Бөлу: онды екіге бөлсек — бес."],
        # Scene 5: exam stats
        ["НИШ емтиханында осы тақырыптан үш-бес сұрақ кездеседі.", "Сондықтан жақсы меңгеру өте маңызды!"],
        # Scene 6: CTA
        ["Енді тесттерді шешіп көрейік.", "Сәттілік тілеймін!"],
    ],

    "lesson-02-audio.mp3": [
        ["Сәлем, балалар!", "Енді келесі маңызды тақырыппен танысамыз — разрядтар."],
        ["Разряд дегеніміз — цифрдың сандағы орны.", "Дәл осы орын цифрдың мәнін анықтайды."],
        ["Қараңдар: үш мың сегіз жүз қырық жеті саны.", "Мұнда жеті — бірліктер разрядында.", "Төрт — ондықтар разрядында.", "Сегіз — жүздіктер разрядында.", "Үш — мыңдықтар разрядында."],
        ["Негізгі разрядтар мыналар: бірлік, ондық, жүздік, мыңдық, он мыңдық, жүз мыңдық және миллион.", "Әр жаңа разряд алдыңғысынан он есе үлкен.", "Бір ондық — он бірлікке тең.", "Бір жүздік — он ондыққа тең."],
        ["Мысалы, бес мың екі жүз отыз төрт санындағы цифр екі қандай разрядта тұр?", "Дұрыс — жүздіктерде!", "Сондықтан екінің мәні екі жүзге тең."],
        ["Міне, разрядты дұрыс анықтай білу — математикадағы ең маңызды дағдылардың бірі!"],
    ],

    "lesson-03-audio.mp3": [
        ["Амалдар реті — математикадағы ең маңызды ереже.", "Егер өрнекте бірнеше амал болса, қайсысын бірінші орындау керек екенін білу қажет."],
        ["Тәртіп мынадай.", "Біріншіден — жақшадағы амалдар.", "Екіншіден — дәрежелер.", "Үшіншіден — көбейту мен бөлу, солдан оңға қарай.", "Төртіншіден — қосу мен азайту, солдан оңға қарай."],
        ["Есте сақтау үшін: Жақша, Дәреже, Көбейту-Бөлу, Қосу-Азайту."],
        ["Мысал қарайық: екі қосу үш көбейту төрт.", "Көбейту бірінші!", "Сондықтан үш көбейту төрт — он екі.", "Ары қарай: екі қосу он екі — он төрт."],
        ["Ең жиі қате — солдан оңға санау.", "Сонда екі қосу үш бес болады, содан бесті төртке көбейтсек жиырма шығады.", "Бұл қате!"],
        ["Күрделі мысал: бес қосу үш көбейту екінің квадраты минус бір.", "Алдымен дәреже — екінің квадраты төртке тең.", "Кейін көбейту — үш көбейту төрт он екіге тең.", "Соңында: бес қосу он екі минус бір он алтыға тең."],
        ["Амалдар ретін ұмытпа — ол НИШ тестіндегі ең көп қате жіберілетін жер!"],
    ],

    "lesson-04-audio.mp3": [
        ["Дәреже дегеніміз — санды өзіне бірнеше рет көбейту.", "Қысқа жазудың ыңғайлы тәсілі."],
        ["Жазылуын түсіну оңай.", "Астыңғы сан — негіз, ал үстінгі кіші сан — дәреже көрсеткіші.", "Көрсеткіш — неше рет көбейту керегін айтады."],
        ["Мысалы, бестің квадраты — бұл бес көбейту бес, жиырма беске тең.", "Екінің кубы — екі көбейту екі көбейту екі, сегізге тең."],
        ["Басқа мысалдар: оннің квадраты — жүз.", "Оннің кубы — мың.", "Он төртінші дәрежеде — он мың."],
        ["Есте сақта: кез келген санның нөлінші дәрежесі біреуге тең.", "Мысалы, бестің нөлінші дәрежесі — бір.", "Жүздің нөлінші дәрежесі — де бір."],
        ["Ең жиі қате — дәрежені жай көбейтумен шатастыру.", "Үштің кубы деген үш көбейту үш көбейту үш, жиырма жетіге тең.", "Ал үш көбейту үш — тоғыз.", "Бұл мүлдем басқа!"],
        ["Дәрежелер — математиканың ықшамдау әдісі.", "Оларды жақсы меңгеру тест шығарудың жылдамдығын арттырады!"],
    ],

    "lesson-05-audio.mp3": [
        ["Қосу амалының екі пайдалы қасиеті бар.", "Оларды білу сандарды жылдам қосуға көмектеседі."],
        ["Бірінші — ауыстыру қасиеті.", "Қосылғыштардың орнын ауыстыруға болады, жауап өзгермейді.", "Мысалы, үш қосу жеті — он.", "Жеті қосу үш — де он."],
        ["Екінші — топтау қасиеті.", "Қосылғыштарды қалағанша топтауға болады.", "Яғни, қай екеуін алдымен қосу — сенің таңдауың."],
        ["Неге бұл пайдалы?", "Қолайлы жұпты табуға көмектеседі.", "Мысалы, отыз жеті қосу қырық сегіз қосу алпыс үш."],
        ["Отыз жеті қосу алпыс үш — бір жүз.", "Жұмыр сан!", "Енді бір жүз қосу қырық сегіз — бір жүз қырық сегіз."],
        ["Осы қасиеттерді қолдана білсең, есепті тез шығарасың!"],
    ],

    "lesson-06-audio.mp3": [
        ["Көбейтудің де өзіне тән қасиеттері бар.", "Олардың ішінде ең маңыздысы — үлестіру қасиеті."],
        ["Алдымен ауыстыру қасиеті.", "Көбейткіштерді ауыстыруға болады, жауап бірдей болады.", "Мысалы, төрт көбейту жиырма бес — жүз."],
        ["Ең маңыздысы — үлестіру қасиеті.", "Жақшаның алдындағы сан қосылғыштардың әрқайсысына көбейтіледі.", "Бұл жылдам санауға көмектеседі."],
        ["Мысалы, отыз алты көбейту бес, қосу алпыс төрт көбейту бес.", "Тікелей санауға ауыр."],
        ["Үлестіру қасиетін қолданамыз.", "Бесті жақшаның сыртына шығарамыз: отыз алты қосу алпыс төрт, көбейту бес."],
        ["Отыз алты қосу алпыс төрт — жүз.", "Жүз көбейту бес — бес жүз!"],
        ["Осылайша ауыр есепті үш сөзбен шешуге болады!"],
    ],

    # ───────── TOPIC 2: Шамалар және өлшем бірліктері ─────────
    "lesson-t02-intro-audio.mp3": [
        ["Сәлем, балалар!", "Бүгін біз екінші маңызды тақырыппен танысамыз — шамалар және өлшем бірліктері."],
        ["Шама дегеніміз — өлшенетін нәрсе.", "Мысалы, алманың салмағы, сабаққа жүру уақыты, қаладан қалаға дейінгі қашықтық.", "Бәрі шамалар."],
        ["Бұл тақырыпта алты түрлі өлшемді үйренеміз.", "Ұзындық — метрлер мен километрлер.", "Масса — граммдар мен килограммдар.", "Уақыт — минуттар мен сағаттар.", "Аудан, көлем және жылдамдық."],
        ["Негізгі идея — бір бірліктен екіншісіне ауыстыра білу.", "Мысалы, бір метрде жүз сантиметр бар.", "Сондықтан бес метр — бес жүз сантиметр."],
        ["НИШ тестінен осы тақырыптан үш-төрт сұрақ кездеседі.", "Әсіресе аудан мен көлемге аса назар аудар — олар жиі шатастырылады!"],
        ["Енді әр өлшем бірлігін бөлек қарастырамыз.", "Бастадық!"],
    ],

    "lesson-t02-length-audio.mp3": [
        ["Бірінші өлшем — ұзындық.", "Оны күнде қолданамыз."],
        ["Негізгі бірліктер мынадай.", "Бір километрде мың метр бар.", "Бір метрде жүз сантиметр немесе он дециметр.", "Бір дециметрде он сантиметр.", "Бір сантиметрде он миллиметр."],
        ["Ауыстыру мысалдары. Үш километрді метрге аудар.", "Үш мың метр.", "Екі жүз сантиметрді метрге.", "Екі метр."],
        ["Есте сақта. Үлкен бірліктен кішіге — көбейтеміз.", "Кішіден үлкенге — бөлеміз."],
        ["Ұзындықты жақсы меңгер — ол барлық есептердің негізі!"],
    ],

    "lesson-t02-mass-audio.mp3": [
        ["Екінші өлшем — масса.", "Яғни заттың салмағы."],
        ["Негізгі бірліктер. Бір тоннада мың килограмм.", "Бір центнерде жүз килограмм.", "Бір килограммда мың грамм.", "Бір граммда мың миллиграмм."],
        ["Не жеңіл, не ауыр — әртүрлі бірлік.", "Кішкене — миллиграмм. Мысалы, дәрінің салмағы.", "Орташа — грамм немесе килограмм. Мысалы, алма, нан.", "Үлкен — тонна. Мысалы, жүк көлігінің салмағы."],
        ["Мысал қарайық.", "Бір жарым тонна неше килограмм?", "Мың бес жүз килограмм."],
        ["Масса — күнделікті өмірде жиі кездесетін өлшем!"],
    ],

    "lesson-t02-time-audio.mp3": [
        ["Үшінші өлшем — уақыт.", "Ол сен үшін ерекше."],
        ["Бір сағатта алпыс минут.", "Бір минутта алпыс секунд.", "Бір тәулікте жиырма төрт сағат.", "Бір аптада жеті күн.", "Бір жылда үш жүз алпыс бес күн."],
        ["Назар аудар!", "Уақыт — ондық жүйеде емес.", "Бір сағат отыз минут — бір жарым сағат, бір сағат елу емес!"],
        ["Бір сағат он бес минут — неше минут?", "Алпыс қосу он бес — жетпіс бес минут."],
        ["Уақытты дұрыс санау — маңызды дағды!"],
    ],

    "lesson-t02-area-audio.mp3": [
        ["Төртінші өлшем — аудан.", "Беттің мөлшері."],
        ["Аудан — квадрат бірліктермен өлшенеді.", "Мысалы, квадрат метр, квадрат сантиметр."],
        ["Ең маңызды ереже!", "Бір метрде жүз сантиметр болса, онда бір квадрат метрде жүз көбейту жүз — он мың квадрат сантиметр."],
        ["Негізгі бірліктер.", "Бір квадрат километрде бір миллион квадрат метр.", "Бір гектарда он мың квадрат метр.", "Бір арда жүз квадрат метр.", "Бір квадрат метрде он мың квадрат сантиметр."],
        ["Ең жиі қате — квадратты ұмыту.", "Бір метр — жүз сантиметр, бірақ бір квадрат метр — он мың квадрат сантиметр!"],
        ["Квадратын есте сақта — аудан деген осы!"],
    ],

    "lesson-t02-volume-audio.mp3": [
        ["Бесінші өлшем — көлем.", "Мысалы, суының мөлшері."],
        ["Көлем — куб бірліктермен өлшенеді.", "Кубтық метр, кубтық сантиметр."],
        ["Ережесі ұқсас.", "Бір метрде жүз сантиметр. Бір кубтық метрде жүз көбейту жүз көбейту жүз — бір миллион кубтық сантиметр!"],
        ["Маңызды байланыс.", "Бір литр — бір кубтық дециметр.", "Бір миллилитр — бір кубтық сантиметр.", "Яғни көлем мен сыйымдылық бір-бірімен байланысты."],
        ["Көлем — біз айнала қолданатын түсінік!"],
    ],

    "lesson-t02-speed-audio.mp3": [
        ["Алтыншы өлшем — жылдамдық.", "Ол уақыт пен ұзындыққа байланысты."],
        ["Жылдамдық — бір уақытта өтілген жол.", "Формула: жол бөлу уақыт."],
        ["Негізгі бірліктер. Километр сағатына.", "Немесе метр секундына."],
        ["Ауыстыру ережесі.", "Километр сағатынан метр секундына өту үшін — үш бүтін алтыдан біріне бөл.", "Мысалы, отыз алты км/сағ — он м/с."],
        ["Жылдамдық — физиканың да негізі!"],
    ],

    "lesson-t02-compare-audio.mp3": [
        ["Жетінші және соңғы бөлім — шамаларды салыстыру."],
        ["Ереже қарапайым!", "Салыстырған кезде — бір бірлікке келтір.", "Тек сонда ғана сандарды салыстыруға болады."],
        ["Мысалы, қайсысы үлкен: екі метр ме, әлде жүз елу сантиметр ме?", "Екі метрді сантиметрге ауыстырайық — екі жүз сантиметр.", "Екі жүз жүз елуден үлкен.", "Демек, екі метр үлкенірек!"],
        ["Тағы бір мысал. Жарты сағат пен жиырма минут қайсысы ұзақ?", "Жарты сағат — отыз минут.", "Отыз жиырмадан көп.", "Демек, жарты сағат."],
        ["Әрдайым бір бірлікке келтір — жаңылмайсың!"],
    ],
}

OUTPUT_DIR = Path(__file__).parent  # scripts/lessons/


async def generate_scene_audio(text: str, output_path: str, max_retries: int = 5):
    """Generate TTS for one scene's text. Retries on transient failures (503 etc.)."""
    last_err = None
    for attempt in range(max_retries):
        try:
            communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
            with open(output_path, "wb") as f:
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        f.write(chunk["data"])
            if os.path.getsize(output_path) > 1000:  # at least 1KB
                return
        except Exception as e:
            last_err = e
            wait = 3 * (attempt + 1)
            print(f"  retry {attempt+1}/{max_retries} after {wait}s: {type(e).__name__}")
            await asyncio.sleep(wait)
    raise RuntimeError(f"Failed to generate after {max_retries} retries: {last_err}")


def get_mp3_duration_ms(path: str) -> int:
    """Probe MP3 duration via ffmpeg stderr."""
    r = subprocess.run([FFMPEG, "-i", path, "-f", "null", "-"],
                       capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", r.stderr)
    if not m:
        return 0
    h, mn, s = m.groups()
    return int((int(h) * 3600 + int(mn) * 60 + float(s)) * 1000)


def make_silence(output_path: str, duration_ms: int):
    subprocess.run(
        [FFMPEG, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
         "-t", f"{duration_ms / 1000:.3f}", "-acodec", "libmp3lame", "-b:a", "48k",
         output_path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


async def process_lesson(output_name: str, scenes: list):
    """Generate separate TTS per scene, wrap each with PRE + POST silence, concat."""
    workdir = tempfile.mkdtemp(prefix="lesson_")
    try:
        # 1. Generate each scene's audio
        scene_paths = []
        scene_audio_durs = []
        for i, scene_sentences in enumerate(scenes):
            scene_text = " ".join(scene_sentences)
            sp = os.path.join(workdir, f"scene_{i:02d}.mp3")
            await generate_scene_audio(scene_text, sp)
            dur = get_mp3_duration_ms(sp)
            scene_audio_durs.append(dur)
            scene_paths.append(sp)

        # 2. Make pre and post silence mp3s (reused for all scenes)
        pre_silence = os.path.join(workdir, "pre.mp3")
        post_silence = os.path.join(workdir, "post.mp3")
        make_silence(pre_silence, PRE_MS)
        make_silence(post_silence, POST_MS)

        # 3. Build concat list: per scene — pre + audio + post
        concat_list = os.path.join(workdir, "list.txt")
        with open(concat_list, "w", encoding="utf-8") as f:
            for sp in scene_paths:
                f.write(f"file '{pre_silence}'\n")
                f.write(f"file '{sp}'\n")
                f.write(f"file '{post_silence}'\n")

        # 4. Concatenate to final output (same folder as this script)
        output_path = OUTPUT_DIR / output_name
        subprocess.run(
            [FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
             "-acodec", "libmp3lame", "-b:a", "48k", str(output_path)],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )

        # 5. Scene durations = PRE + audio + POST
        durations = [PRE_MS + ad + POST_MS for ad in scene_audio_durs]
        total = sum(durations)

        return {
            "file": output_name,
            "total_ms": total,
            "scene_audio_durs_ms": scene_audio_durs,
            "scene_durations_ms": durations,
            "scene_count": len(scenes),
            "pattern": f"separate-TTS + PRE_{PRE_MS}ms + POST_{POST_MS}ms",
        }
    finally:
        for f in os.listdir(workdir):
            try: os.remove(os.path.join(workdir, f))
            except OSError: pass
        try: os.rmdir(workdir)
        except OSError: pass


async def main():
    # Load existing timings so we can resume on failure
    timings_path = OUTPUT_DIR / "timings.json"
    results = {}
    if timings_path.exists():
        try:
            results = json.loads(timings_path.read_text(encoding="utf-8"))
        except Exception:
            results = {}

    target_lessons = list(LESSONS.items())
    # Allow filtering via CLI arg: python generate_all.py lesson-03
    if len(sys.argv) > 1:
        filt = sys.argv[1]
        target_lessons = [(n, s) for n, s in target_lessons if filt in n]
        print(f"Filter: {filt} → {len(target_lessons)} lesson(s)")

    for name, scenes in target_lessons:
        existing = results.get(name)
        file_ok = (OUTPUT_DIR / name).exists()
        if existing and existing.get("scene_count") == len(scenes) and \
                existing.get("pattern", "").startswith("separate-TTS") and file_ok:
            print(f"\n━━━ {name} SKIP (already v2) ━━━")
            continue

        print(f"\n━━━ {name} ({len(scenes)} scenes) ━━━")
        r = await process_lesson(name, scenes)
        results[name] = r
        print(f"  audio:     {r['scene_audio_durs_ms']}")
        print(f"  durations: {r['scene_durations_ms']}")
        print(f"  total:     {r['total_ms']}ms")

        # Save after each lesson — resume-friendly
        timings_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n✓ Saved timings.json — {len(results)} lessons total")


if __name__ == "__main__":
    asyncio.run(main())
