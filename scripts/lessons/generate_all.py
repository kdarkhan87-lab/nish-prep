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

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

VOICE = "kk-KZ-AigulNeural"
RATE = "-5%"

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

    # Per-scene durations
    durations = []
    prev_end_ms = 0  # running pointer to end of last scene
    for si, (start_idx, end_idx) in enumerate(scene_ranges):
        last_scene = si == len(scene_ranges) - 1
        # Clamp to available boundaries
        s_clamped = min(start_idx, len(boundaries) - 1) if boundaries else None
        e_clamped = min(end_idx, len(boundaries) - 1) if boundaries else None
        if s_clamped is None:
            durations.append(0)
            continue
        scene_start = boundaries[s_clamped]["offset_ms"]
        if last_scene:
            # Extend last scene to end of audio
            scene_end = total_audio_ms
        else:
            scene_end = boundaries[e_clamped]["offset_ms"] + boundaries[e_clamped]["duration_ms"]
        durations.append(round(scene_end - scene_start))
        prev_end_ms = scene_end

    # Initial silence: add to scene 1
    if durations and boundaries:
        initial_silence = boundaries[0]["offset_ms"]
        durations[0] = round(durations[0] + initial_silence)

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
