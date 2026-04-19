"""
Generate TTS audio for all lessons + extract scene durations from sentence boundaries.
Scenes are defined as lists of sentence strings.
"""

import edge_tts
import asyncio
import json
import sys
import io
import re
from pathlib import Path

# ffmpeg for inserting silent pauses between scenes
import subprocess
import tempfile
import os
try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
    PAUSE_BETWEEN_SCENES_MS = 600  # silence inserted between scenes for comprehension
except ImportError:
    FFMPEG = None
    PAUSE_BETWEEN_SCENES_MS = 0


def insert_silent_pauses(input_mp3: str, scene_boundaries_ms, pause_ms: int) -> int:
    """Split input mp3 at scene boundaries, concatenate with silent pauses between.
    Returns total duration of the resulting audio in ms.
    Overwrites input_mp3 with the padded version.
    """
    if FFMPEG is None or pause_ms <= 0 or len(scene_boundaries_ms) < 2:
        return sum(int(e - s) for s, e in scene_boundaries_ms)

    workdir = tempfile.mkdtemp(prefix="lesson_pad_")
    try:
        # Generate silence mp3 once
        silence_path = os.path.join(workdir, "silence.mp3")
        subprocess.run(
            [FFMPEG, "-y", "-f", "lavfi", "-i", f"anullsrc=r=24000:cl=mono",
             "-t", f"{pause_ms / 1000:.3f}", "-acodec", "libmp3lame", "-b:a", "48k",
             silence_path],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )

        # Extract each scene
        scene_paths = []
        for i, (start_ms, end_ms) in enumerate(scene_boundaries_ms):
            scene_path = os.path.join(workdir, f"scene_{i:02d}.mp3")
            subprocess.run(
                [FFMPEG, "-y", "-i", input_mp3,
                 "-ss", f"{start_ms / 1000:.3f}", "-to", f"{end_ms / 1000:.3f}",
                 "-acodec", "libmp3lame", "-b:a", "48k", scene_path],
                check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            )
            scene_paths.append(scene_path)

        # Build concat list
        concat_list = os.path.join(workdir, "list.txt")
        with open(concat_list, "w", encoding="utf-8") as f:
            for i, sp in enumerate(scene_paths):
                f.write(f"file '{sp}'\n")
                if i < len(scene_paths) - 1:
                    f.write(f"file '{silence_path}'\n")

        # Concatenate
        subprocess.run(
            [FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
             "-acodec", "libmp3lame", "-b:a", "48k", input_mp3],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )

        total = sum(int(e - s) for s, e in scene_boundaries_ms) + pause_ms * (len(scene_boundaries_ms) - 1)
        return total
    finally:
        # Cleanup temp files
        for f in os.listdir(workdir):
            try:
                os.remove(os.path.join(workdir, f))
            except OSError:
                pass
        try:
            os.rmdir(workdir)
        except OSError:
            pass

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

VOICE = "kk-KZ-AigulNeural"
RATE = "-10%"  # Slower pacing for kids + comprehension pauses between scenes

# Each lesson = list of scenes, each scene = list of sentences.
# Join all sentences → TTS → sentence boundaries → per-scene durations.

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
        # Scene 1: title
        ["Сәлем, балалар!", "Енді келесі маңызды тақырыппен танысамыз — разрядтар."],
        # Scene 2: definition
        ["Разряд дегеніміз — цифрдың сандағы орны.", "Дәл осы орын цифрдың мәнін анықтайды."],
        # Scene 3: example 3847
        ["Қараңдар: үш мың сегіз жүз қырық жеті саны.", "Мұнда жеті — бірліктер разрядында.", "Төрт — ондықтар разрядында.", "Сегіз — жүздіктер разрядында.", "Үш — мыңдықтар разрядында."],
        # Scene 4: list of разрядтар
        ["Негізгі разрядтар мыналар: бірлік, ондық, жүздік, мыңдық, он мыңдық, жүз мыңдық және миллион.", "Әр жаңа разряд алдыңғысынан он есе үлкен.", "Бір ондық — он бірлікке тең.", "Бір жүздік — он ондыққа тең."],
        # Scene 5: quiz 5234
        ["Мысалы, бес мың екі жүз отыз төрт санындағы цифр екі қандай разрядта тұр?", "Дұрыс — жүздіктерде!", "Сондықтан екінің мәні екі жүзге тең."],
        # Scene 6: CTA
        ["Міне, разрядты дұрыс анықтай білу — математикадағы ең маңызды дағдылардың бірі!"],
    ],

    "lesson-03-audio.mp3": [
        # Scene 1: title / intro
        ["Амалдар реті — математикадағы ең маңызды ереже.", "Егер өрнекте бірнеше амал болса, қайсысын бірінші орындау керек екенін білу қажет."],
        # Scene 2: 4 rules
        ["Тәртіп мынадай.", "Біріншіден — жақшадағы амалдар.", "Екіншіден — дәрежелер.", "Үшіншіден — көбейту мен бөлу, солдан оңға қарай.", "Төртіншіден — қосу мен азайту, солдан оңға қарай."],
        # Scene 3: mnemonic
        ["Есте сақтау үшін: Жақша, Дәреже, Көбейту-Бөлу, Қосу-Азайту."],
        # Scene 4: simple example
        ["Мысал қарайық: екі қосу үш көбейту төрт.", "Көбейту бірінші!", "Сондықтан үш көбейту төрт — он екі.", "Ары қарай: екі қосу он екі — он төрт."],
        # Scene 5: common mistake
        ["Ең жиі қате — солдан оңға санау.", "Сонда екі қосу үш бес болады, содан бесті төртке көбейтсек жиырма шығады.", "Бұл қате!"],
        # Scene 6: complex example
        ["Күрделі мысал: бес қосу үш көбейту екінің квадраты минус бір.", "Алдымен дәреже — екінің квадраты төртке тең.", "Кейін көбейту — үш көбейту төрт он екіге тең.", "Соңында: бес қосу он екі минус бір он алтыға тең."],
        # Scene 7: CTA
        ["Амалдар ретін ұмытпа — ол НИШ тестіндегі ең көп қате жіберілетін жер!"],
    ],

    "lesson-05-audio.mp3": [
        # Scene 1: intro
        ["Қосу амалының екі пайдалы қасиеті бар.", "Оларды білу сандарды жылдам қосуға көмектеседі."],
        # Scene 2: commutative
        ["Бірінші — ауыстыру қасиеті.", "Қосылғыштардың орнын ауыстыруға болады, жауап өзгермейді.", "Мысалы, үш қосу жеті — он.", "Жеті қосу үш — де он."],
        # Scene 3: associative
        ["Екінші — топтау қасиеті.", "Қосылғыштарды қалағанша топтауға болады.", "Яғни, қай екеуін алдымен қосу — сенің таңдауың."],
        # Scene 4: practical intro
        ["Неге бұл пайдалы?", "Қолайлы жұпты табуға көмектеседі.", "Мысалы, отыз жеті қосу қырық сегіз қосу алпыс үш."],
        # Scene 5: step solution
        ["Отыз жеті қосу алпыс үш — бір жүз.", "Жұмыр сан!", "Енді бір жүз қосу қырық сегіз — бір жүз қырық сегіз."],
        # Scene 6: CTA
        ["Осы қасиеттерді қолдана білсең, есепті тез шығарасың!"],
    ],

    "lesson-06-audio.mp3": [
        # Scene 1: intro
        ["Көбейтудің де өзіне тән қасиеттері бар.", "Олардың ішінде ең маңыздысы — үлестіру қасиеті."],
        # Scene 2: commutative
        ["Алдымен ауыстыру қасиеті.", "Көбейткіштерді ауыстыруға болады, жауап бірдей болады.", "Мысалы, төрт көбейту жиырма бес — жүз."],
        # Scene 3: distributive formula
        ["Ең маңыздысы — үлестіру қасиеті.", "Жақшаның алдындағы сан қосылғыштардың әрқайсысына көбейтіледі.", "Бұл жылдам санауға көмектеседі."],
        # Scene 4: example setup
        ["Мысалы, отыз алты көбейту бес, қосу алпыс төрт көбейту бес.", "Тікелей санауға ауыр."],
        # Scene 5: transform
        ["Үлестіру қасиетін қолданамыз.", "Бесті жақшаның сыртына шығарамыз: отыз алты қосу алпыс төрт, көбейту бес."],
        # Scene 6: solve
        ["Отыз алты қосу алпыс төрт — жүз.", "Жүз көбейту бес — бес жүз!"],
        # Scene 7: CTA
        ["Осылайша ауыр есепті үш сөзбен шешуге болады!"],
    ],

    # TOPIC 2 sections
    "lesson-t02-length-audio.mp3": [
        # Scene 1: title
        ["Бірінші өлшем — ұзындық.", "Оны күнде қолданамыз."],
        # Scene 2: main units
        ["Негізгі бірліктер мынадай.", "Бір километрде мың метр бар.", "Бір метрде жүз сантиметр немесе он дециметр.", "Бір дециметрде он сантиметр.", "Бір сантиметрде он миллиметр."],
        # Scene 3: conversion examples
        ["Ауыстыру мысалдары. Үш километрді метрге аудар.", "Үш мың метр.", "Екі жүз сантиметрді метрге.", "Екі метр."],
        # Scene 4: key rule
        ["Есте сақта. Үлкен бірліктен кішіге — көбейтеміз.", "Кішіден үлкенге — бөлеміз."],
        # Scene 5: CTA
        ["Ұзындықты жақсы меңгер — ол барлық есептердің негізі!"],
    ],

    "lesson-t02-mass-audio.mp3": [
        # Scene 1: title
        ["Екінші өлшем — масса.", "Яғни заттың салмағы."],
        # Scene 2: main units
        ["Негізгі бірліктер. Бір тоннада мың килограмм.", "Бір центнерде жүз килограмм.", "Бір килограммда мың грамм.", "Бір граммда мың миллиграмм."],
        # Scene 3: when to use
        ["Не жеңіл, не ауыр — әртүрлі бірлік.", "Кішкене — миллиграмм. Мысалы, дәрінің салмағы.", "Орташа — грамм немесе килограмм. Мысалы, алма, нан.", "Үлкен — тонна. Мысалы, жүк көлігінің салмағы."],
        # Scene 4: example
        ["Мысал қарайық.", "Бір жарым тонна неше килограмм?", "Мың бес жүз килограмм."],
        # Scene 5: CTA
        ["Масса — күнделікті өмірде жиі кездесетін өлшем!"],
    ],

    "lesson-t02-time-audio.mp3": [
        # Scene 1: title
        ["Үшінші өлшем — уақыт.", "Ол сен үшін ерекше."],
        # Scene 2: main units
        ["Негізгі бірліктер. Бір сағатта алпыс минут.", "Бір минутта алпыс секунд.", "Бір тәулікте жиырма төрт сағат.", "Бір аптада жеті күн.", "Бір жылда үш жүз алпыс бес күн."],
        # Scene 3: важный нюанс
        ["Назар аудар!", "Уақыт — ондық жүйеде емес.", "Бір сағат отыз минут — бір жарым сағат, бір сағат елу емес!"],
        # Scene 4: example
        ["Мысал. Бір сағат он бес минут — неше минут?", "Алпыс қосу он бес — жетпіс бес минут."],
        # Scene 5: CTA
        ["Уақытты дұрыс санау — маңызды дағды!"],
    ],

    "lesson-t02-area-audio.mp3": [
        # Scene 1: title
        ["Төртінші өлшем — аудан.", "Яғни беттің мөлшері."],
        # Scene 2: key idea
        ["Аудан — квадрат бірліктермен өлшенеді.", "Мысалы, квадрат метр, квадрат сантиметр."],
        # Scene 3: main trick
        ["Ең маңызды ереже!", "Бір метрде жүз сантиметр болса, онда бір квадрат метрде жүз көбейту жүз — он мың квадрат сантиметр."],
        # Scene 4: units table
        ["Негізгі бірліктер. Бір квадрат километрде бір миллион квадрат метр.", "Бір гектарда он мың квадрат метр.", "Бір арда жүз квадрат метр.", "Бір квадрат метрде он мың квадрат сантиметр."],
        # Scene 5: warning
        ["Ең жиі қате — квадратты ұмыту.", "Бір метр — жүз сантиметр, бірақ бір квадрат метр — он мың квадрат сантиметр!"],
        # Scene 6: CTA
        ["Квадратын есте сақта — аудан деген осы!"],
    ],

    "lesson-t02-volume-audio.mp3": [
        # Scene 1: title
        ["Бесінші өлшем — көлем.", "Мысалы, суының мөлшері."],
        # Scene 2: key idea
        ["Көлем — куб бірліктермен өлшенеді.", "Кубтық метр, кубтық сантиметр."],
        # Scene 3: main trick
        ["Ережесі ұқсас.", "Бір метрде жүз сантиметр. Бір кубтық метрде жүз көбейту жүз көбейту жүз — бір миллион кубтық сантиметр!"],
        # Scene 4: liter connection
        ["Маңызды байланыс.", "Бір литр — бір кубтық дециметр.", "Бір миллилитр — бір кубтық сантиметр.", "Яғни көлем мен сыйымдылық бір-бірімен байланысты."],
        # Scene 5: CTA
        ["Көлем — біз айнала қолданатын түсінік!"],
    ],

    "lesson-t02-speed-audio.mp3": [
        # Scene 1: title
        ["Алтыншы өлшем — жылдамдық.", "Ол уақыт пен ұзындыққа байланысты."],
        # Scene 2: formula
        ["Жылдамдық — бір уақытта өтілген жол.", "Формула: жол бөлу уақыт."],
        # Scene 3: units
        ["Негізгі бірліктер. Километр сағатына.", "Немесе метр секундына."],
        # Scene 4: conversion
        ["Ауыстыру ережесі.", "Километр сағатынан метр секундына өту үшін — үш бүтін алтыдан біріне бөл.", "Мысалы, отыз алты км/сағ — он м/с."],
        # Scene 5: CTA
        ["Жылдамдық — физиканың да негізі!"],
    ],

    "lesson-t02-compare-audio.mp3": [
        # Scene 1: title
        ["Жетінші және соңғы бөлім — шамаларды салыстыру."],
        # Scene 2: rule
        ["Ереже қарапайым!", "Салыстырған кезде — бір бірлікке келтір.", "Тек сонда ғана сандарды салыстыруға болады."],
        # Scene 3: example 1
        ["Мысалы, қайсысы үлкен: екі метр ме, әлде жүз елу сантиметр ме?", "Екі метрді сантиметрге ауыстырайық — екі жүз сантиметр.", "Екі жүз жүз елуден үлкен.", "Демек, екі метр үлкенірек!"],
        # Scene 4: example 2
        ["Тағы бір мысал. Жарты сағат пен жиырма минут қайсысы ұзақ?", "Жарты сағат — отыз минут.", "Отыз жиырмадан көп.", "Демек, жарты сағат."],
        # Scene 5: CTA
        ["Әрдайым бір бірлікке келтір — жаңылмайсың!"],
    ],

    "lesson-t02-intro-audio.mp3": [
        # Scene 1: greeting + title
        ["Сәлем, балалар!", "Бүгін біз екінші маңызды тақырыппен танысамыз — шамалар және өлшем бірліктері."],
        # Scene 2: definition
        ["Шама дегеніміз — өлшенетін нәрсе.", "Мысалы, алманың салмағы, сабаққа жүру уақыты, қаладан қалаға дейінгі қашықтық.", "Бәрі шамалар."],
        # Scene 3: 6 types
        ["Бұл тақырыпта алты түрлі өлшемді үйренеміз.", "Ұзындық — метрлер мен километрлер.", "Масса — граммдар мен килограммдар.", "Уақыт — минуттар мен сағаттар.", "Аудан, көлем және жылдамдық."],
        # Scene 4: key idea
        ["Негізгі идея — бір бірліктен екіншісіне ауыстыра білу.", "Мысалы, бір метрде жүз сантиметр бар.", "Сондықтан бес метр — бес жүз сантиметр."],
        # Scene 5: NISH stats
        ["НИШ тестінен осы тақырыптан үш-төрт сұрақ кездеседі.", "Әсіресе аудан мен көлемге аса назар аудар — олар жиі шатастырылады!"],
        # Scene 6: CTA
        ["Енді әр өлшем бірлігін бөлек қарастырамыз.", "Бастадық!"],
    ],

    "lesson-04-audio.mp3": [
        # Scene 1: title
        ["Дәреже дегеніміз — санды өзіне бірнеше рет көбейту.", "Қысқа жазудың ыңғайлы тәсілі."],
        # Scene 2: notation explanation
        ["Жазылуын түсіну оңай.", "Астыңғы сан — негіз, ал үстінгі кіші сан — дәреже көрсеткіші.", "Көрсеткіш — неше рет көбейту керегін айтады."],
        # Scene 3: examples 5² and 2³
        ["Мысалы, бестің квадраты — бұл бес көбейту бес, жиырма беске тең.", "Екінің кубы — екі көбейту екі көбейту екі, сегізге тең."],
        # Scene 4: powers of 10
        ["Басқа мысалдар: оннің квадраты — жүз.", "Оннің кубы — мың.", "Он төртінші дәрежеде — он мың."],
        # Scene 5: a^0 = 1
        ["Есте сақта: кез келген санның нөлінші дәрежесі біреуге тең.", "Мысалы, бестің нөлінші дәрежесі — бір.", "Жүздің нөлінші дәрежесі — де бір."],
        # Scene 6: common mistake
        ["Ең жиі қате — дәрежені жай көбейтумен шатастыру.", "Үштің кубы деген үш көбейту үш көбейту үш, жиырма жетіге тең.", "Ал үш көбейту үш — тоғыз.", "Бұл мүлдем басқа!"],
        # Scene 7: CTA
        ["Дәрежелер — математиканың ықшамдау әдісі.", "Оларды жақсы меңгеру тест шығарудың жылдамдығын арттырады!"],
    ],
}


def normalize(s):
    """Strip punctuation and whitespace for matching."""
    return re.sub(r"[^\wа-яА-ЯәіңғүұқөһёӘІҢҒҮҰҚӨҺЁ]", "", s).lower()


async def process_lesson(output_name, scenes):
    # Flatten all sentences in order
    all_sentences = []
    scene_ranges = []  # (start_idx, end_idx) inclusive of sentence indices for each scene
    idx = 0
    for scene in scenes:
        start = idx
        for s in scene:
            all_sentences.append(s)
            idx += 1
        scene_ranges.append((start, idx - 1))

    full_text = " ".join(all_sentences)

    # Generate
    communicate = edge_tts.Communicate(full_text, VOICE, rate=RATE)
    boundaries = []
    with open(output_name, "wb") as audio_file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_file.write(chunk["data"])
            elif chunk["type"] == "SentenceBoundary":
                boundaries.append({
                    "offset_ms": chunk["offset"] / 10000,
                    "duration_ms": chunk["duration"] / 10000,
                    "text": chunk["text"],
                })

    # Match boundaries to sentences (in order)
    # Usually count matches
    if len(boundaries) != len(all_sentences):
        print(f"  WARN: boundaries={len(boundaries)}, sentences={len(all_sentences)}")
        # Try to match by order — assume boundaries come in same order
    total_audio_ms = boundaries[-1]["offset_ms"] + boundaries[-1]["duration_ms"] if boundaries else 0

    # Per-scene durations (before silence insertion)
    scene_boundaries_ms = []  # (start_ms, end_ms) in the ORIGINAL audio
    for si, (start_idx, end_idx) in enumerate(scene_ranges):
        last_scene = si == len(scene_ranges) - 1
        s_clamped = min(start_idx, len(boundaries) - 1) if boundaries else None
        e_clamped = min(end_idx, len(boundaries) - 1) if boundaries else None
        if s_clamped is None:
            scene_boundaries_ms.append((0, 0))
            continue
        scene_start = boundaries[s_clamped]["offset_ms"]
        if last_scene:
            scene_end = total_audio_ms
        else:
            # Split POINT is midway between end of this scene's last sentence
            # and start of next scene's first sentence (gives natural cut)
            this_end = boundaries[e_clamped]["offset_ms"] + boundaries[e_clamped]["duration_ms"]
            next_start_idx = scene_ranges[si + 1][0]
            if next_start_idx < len(boundaries):
                next_start = boundaries[next_start_idx]["offset_ms"]
                scene_end = (this_end + next_start) / 2
            else:
                scene_end = this_end
        scene_boundaries_ms.append((scene_start, scene_end))

    # First scene should include the initial silence (start from 0)
    if scene_boundaries_ms:
        scene_boundaries_ms[0] = (0, scene_boundaries_ms[0][1])

    # Insert silent pauses between scenes via ffmpeg
    durations = []
    if FFMPEG is not None and PAUSE_BETWEEN_SCENES_MS > 0 and len(scene_boundaries_ms) > 1:
        new_total = insert_silent_pauses(output_name, scene_boundaries_ms, PAUSE_BETWEEN_SCENES_MS)
        for i, (start_ms, end_ms) in enumerate(scene_boundaries_ms):
            base_dur = end_ms - start_ms
            if i < len(scene_boundaries_ms) - 1:
                base_dur += PAUSE_BETWEEN_SCENES_MS
            durations.append(round(base_dur))
        total_audio_ms = new_total
    else:
        for start_ms, end_ms in scene_boundaries_ms:
            durations.append(round(end_ms - start_ms))

    return {
        "file": output_name,
        "total_ms": round(total_audio_ms),
        "sentence_count": len(boundaries),
        "scene_durations_ms": durations,
        "scene_count": len(scenes),
    }


async def main():
    results = {}
    for name, scenes in LESSONS.items():
        print(f"\nProcessing {name}...")
        r = await process_lesson(name, scenes)
        results[name] = r
        print(f"  sentences: {r['sentence_count']}, scene durations: {r['scene_durations_ms']}, total: {r['total_ms']}ms")

    Path("timings.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\n✓ Saved timings.json")


asyncio.run(main())
