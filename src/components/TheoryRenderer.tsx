"use client";

import { useState } from "react";
import { LessonVideo } from "@/components/LessonVideo";
import type { LessonConfig } from "@/data/lessons";

interface QuizData {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function InlineQuiz({ quiz }: { quiz: QuizData }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const isCorrect = selected === quiz.correct;

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
    setAttempts((a) => a + 1);

    if (i === quiz.correct) {
      setRevealed(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (attempts >= 1) {
        setRevealed(true);
      }
    }
  }

  return (
    <div className={`my-5 border-2 border-dashed rounded-xl p-4 transition-all ${
      revealed && isCorrect
        ? "border-green-300 bg-green-50/50"
        : revealed && !isCorrect
        ? "border-red-300 bg-red-50/50"
        : "border-blue-300 bg-blue-50/50"
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-white text-xs font-bold px-2 py-1 rounded-lg ${
          revealed && isCorrect ? "bg-green-600" : revealed ? "bg-red-500" : "bg-blue-600"
        }`}>
          {revealed && isCorrect ? "✅ Дұрыс!" : revealed ? "❌ Қате" : "✍️ ТЕКСЕР"}
        </span>
        <span className="text-sm text-gray-500">
          {revealed ? "" : "Бас — жауапты тексер!"}
        </span>
      </div>

      <p className="font-bold text-gray-800 mb-3">{quiz.question}</p>

      <div className={`space-y-2 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
        {quiz.options.map((opt, i) => {
          let style = "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer active:scale-[0.98]";
          if (revealed) {
            if (i === quiz.correct) style = "border-green-400 bg-green-100 text-green-800 font-bold";
            else if (i === selected) style = "border-red-400 bg-red-50 text-red-400 line-through";
            else style = "border-gray-200 bg-gray-50 text-gray-400";
          } else if (selected === i) {
            style = "border-red-300 bg-red-50 text-red-700";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${style}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)})</span>
              {opt}
              {revealed && i === quiz.correct && " ✅"}
              {revealed && i === selected && i !== quiz.correct && " ❌"}
            </button>
          );
        })}
      </div>

      {!revealed && selected !== null && !isCorrect && (
        <div className="mt-3 p-3 rounded-lg text-sm bg-orange-50 border border-orange-200">
          <span className="font-bold text-orange-700">🤔 Дұрыс емес.</span>{" "}
          <span className="text-orange-600">Тағы бір рет ойлап көр!</span>
        </div>
      )}

      {revealed && (
        <div className={`mt-3 p-4 rounded-xl text-sm ${isCorrect ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`}>
          <div className="font-bold mb-1">{isCorrect ? "🎉 Жарайсың!" : "💡 Дұрыс жауап:"}</div>
          <p className="text-gray-700">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Кесте рендерлеу
function renderTable(lines: string[], startIndex: number): { html: string; endIndex: number } {
  const rows: string[][] = [];
  let i = startIndex;

  while (i < lines.length && lines[i].trim().startsWith("|")) {
    const cells = lines[i]
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c !== "");
    // Бөлгіш сызықты өткізу (|---|---|)
    if (cells.every((c) => /^[-:]+$/.test(c))) {
      i++;
      continue;
    }
    rows.push(cells);
    i++;
  }

  if (rows.length === 0) return { html: "", endIndex: startIndex };

  const headerRow = rows[0];
  const bodyRows = rows.slice(1);

  let html = `<div class="overflow-x-auto my-4"><table class="w-full border-collapse rounded-xl overflow-hidden shadow-sm">`;
  html += `<thead><tr class="bg-blue-600 text-white">`;
  headerRow.forEach((cell) => {
    html += `<th class="px-4 py-3 text-left text-sm font-bold">${fmt(cell)}</th>`;
  });
  html += `</tr></thead><tbody>`;
  bodyRows.forEach((row, ri) => {
    html += `<tr class="${ri % 2 === 0 ? "bg-white" : "bg-blue-50"}">`;
    row.forEach((cell) => {
      html += `<td class="px-4 py-3 text-sm text-gray-700 border-t border-gray-100">${fmt(cell)}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table></div>`;

  return { html, endIndex: i };
}

function renderTheoryHTML(text: string, sectionNumber?: number): string {
  const lines = text.split("\n");
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      blocks.push(`<div class="mb-8"><h1 class="text-3xl font-extrabold text-blue-800 flex items-center gap-3"><span class="bg-blue-100 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">📖</span>${line.slice(2)}</h1></div>`);
      i++; continue;
    }
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      const titleLower = title.toLowerCase();

      // "Жиі қателер" — арнайы стиль
      if (titleLower.includes("жиі қателер") || titleLower.includes("⚠️")) {
        blocks.push(`<div class="mt-8 mb-4 bg-red-50 border-2 border-red-200 rounded-2xl p-4"><h2 class="text-xl font-bold text-red-700 flex items-center gap-3"><span class="text-2xl">🚫</span>Осылай жасама! (Жиі қателер)</h2></div>`);
        i++; continue;
      }

      // "Есте сақта" — арнайы стиль
      if (titleLower.includes("есте сақта") || titleLower.includes("🧠")) {
        blocks.push(`<div class="mt-8 mb-4 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4"><h2 class="text-xl font-bold text-amber-700 flex items-center gap-3"><span class="text-2xl">🧠</span>Міндетті есте сақта!</h2></div>`);
        i++; continue;
      }

      // "Не үшін керек" — кіріспе стилі
      if (titleLower.includes("не үшін керек")) {
        blocks.push(`<div class="mt-6 mb-4"><h2 class="text-lg font-bold text-gray-500 flex items-center gap-2"><span class="text-xl">💡</span>${title}</h2></div>`);
        i++; continue;
      }

      // "... дегеніміз не?" — анықтама стилі
      if (titleLower.includes("дегеніміз не") || titleLower.includes("дегеніміз")) {
        blocks.push(`<div class="mt-6 mb-4"><h2 class="text-lg font-bold text-indigo-700 flex items-center gap-2"><span class="text-xl">📌</span>${title}</h2></div>`);
        i++; continue;
      }

      // Қалған оқу секциялары — номермен
      const numBadge = sectionNumber !== undefined
        ? `<span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">${sectionNumber}</span>`
        : '';
      blocks.push(`<div class="mt-8 mb-4"><h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">${numBadge}${title}</h2></div>`);
      i++; continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(`<h3 class="text-lg font-bold text-gray-700 mt-5 mb-2 flex items-center gap-2"><span class="text-blue-500">▸</span> ${line.slice(4)}</h3>`);
      i++; continue;
    }

    // Кесте
    if (line.trim().startsWith("|")) {
      const { html, endIndex } = renderTable(lines, i);
      if (html) {
        blocks.push(html);
        i = endIndex;
        continue;
      }
    }

    // Формула блок
    if (line.trim().match(/^\*\*.+\*\*$/) && (line.includes("=") || line.includes("→") || line.includes("÷") || line.includes("×"))) {
      const formula = line.trim().replace(/\*\*/g, "");
      blocks.push(`<div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-5 py-3 my-3 font-mono text-lg text-blue-900 font-bold text-center">${formula}</div>`);
      i++; continue;
    }

    // Тізім
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(fmt(lines[i].slice(2)));
        i++;
      }
      blocks.push(`<div class="bg-gray-50 rounded-xl p-4 my-3"><ul class="space-y-2">${items.map(item => `<li class="flex items-start gap-2 text-gray-700"><span class="text-blue-500 mt-1 flex-shrink-0">●</span><span>${item}</span></li>`).join("")}</ul></div>`);
      continue;
    }

    // Мысал блогы
    if (line.trim().startsWith("Мысалы:") || line.trim().startsWith("Мысал:")) {
      blocks.push(`<div class="bg-green-50 border-l-4 border-green-400 rounded-r-xl px-5 py-3 my-3"><div class="flex items-center gap-2 mb-1"><span class="text-green-600 text-lg">💡</span><span class="font-bold text-green-700 text-sm">МЫСАЛ</span></div><p class="text-green-800 font-medium">${fmt(line.trim())}</p></div>`);
      i++; continue;
    }

    if (line.trim() === "") { i++; continue; }

    blocks.push(`<p class="text-gray-600 leading-relaxed my-2 text-[15px]">${fmt(line)}</p>`);
    i++;
  }
  return blocks.join("\n");
}

function fmt(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-bold bg-yellow-100 px-1 rounded">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

// Тақырып атауынан визуализацияны анықтау
function detectVisuals(sectionText: string): string | null {
  const lower = sectionText.toLowerCase();

  // Геометриялық контекст: фигура атаулары немесе нақты формула (S = a..., P = ...)
  const hasGeometryShape = /тіктөртбұрыш|үшбұрыш|шаршы|квадрат|параллелограм|ромб|трапеция/.test(lower);
  const hasAreaFormula = /\bS\s*=\s*a/.test(sectionText);
  const hasPerimFormula = /\bP\s*=\s*[0-9a-zа-я(]/i.test(sectionText);

  if (lower.includes("бөлшек") && (lower.includes("дегеніміз") || lower.includes("не?"))) return "fraction-intro";
  if (lower.includes("периметр") && (hasGeometryShape || hasPerimFormula)) return "perimeter";
  if (lower.includes("аудан") && !lower.includes("кері") && (hasGeometryShape || hasAreaFormula)) return "area";
  if (lower.includes("бұрыш") && /°|тік бұрыш|сүйір|доғал|градус/.test(lower)) return "angles";
  if (lower.includes("шеңбер") || (lower.includes("дөңгелек") && /радиус|диаметр|πr|π\s*r/.test(lower))) return "circle";
  return null;
}

export function TheoryRenderer({
  theory,
  quizzes,
  sectionLessons = [],
}: {
  theory: string;
  quizzes: QuizData[] | QuizData[][];
  sectionLessons?: LessonConfig[];
}) {
  const sections = theory.split(/(?=^## )/m);

  const isNested = quizzes.length > 0 && Array.isArray(quizzes[0]);
  const sectionQuizzes: QuizData[][] = isNested
    ? (quizzes as QuizData[][])
    : (quizzes as QuizData[]).map(q => [q]);

  // Map section index → matching lesson config
  const sectionToLesson = new Map<number, LessonConfig>();
  for (const lesson of sectionLessons) {
    if (!lesson.matchSection) continue;
    for (let si = 1; si < sections.length; si++) {
      const firstLine = sections[si].split("\n")[0] || "";
      if (lesson.matchSection.test(firstLine) && !sectionToLesson.has(si)) {
        sectionToLesson.set(si, lesson);
        break;
      }
    }
  }

  const combined: Array<
    | { type: "section"; html: string; visual: string | null; lesson?: LessonConfig }
    | { type: "quizGroup"; items: QuizData[] }
  > = [];

  // Квизді дұрыс секцияға сәйкестендіру
  // Квиздегі сөздерді секция мәтінінен іздейміз
  function findBestSection(quizGroup: QuizData[], sections: string[]): number {
    // Квиздің сұрақтарынан кілт сөздерді шығару
    const quizText = quizGroup.map(q => q.question + " " + q.explanation).join(" ").toLowerCase();

    let bestIdx = -1;
    let bestScore = 0;

    for (let si = 1; si < sections.length; si++) {
      const secLower = sections[si].toLowerCase();
      // Кіріспе/қорытынды секцияларды өткізу
      const firstLine = sections[si].split("\n")[0] || "";
      if (/не үшін керек|есте сақта|жиі қателер|⚠️|🧠/i.test(firstLine)) continue;
      if (sections[si].length < 80) continue;

      let score = 0;
      // Секциядағы кілт сөздер квиз сұрақтарында бар ма?
      const keywords = secLower.match(/[а-яәіңғүұқөһёa-z0-9²³⁰⁴⁵]+/g) || [];
      const uniqueKeywords = [...new Set(keywords)].filter(k => k.length > 3);
      for (const kw of uniqueKeywords) {
        if (quizText.includes(kw)) score++;
      }
      // Секция тақырыбындағы кілт сөздерге бонус (× 5)
      const titleLine = sections[si].split("\n")[0]?.toLowerCase() || "";
      const titleWords = titleLine.match(/[а-яәіңғүұқөһёa-z]+/g) || [];
      for (const tw of titleWords) {
        if (tw.length > 3 && quizText.includes(tw)) score += 5;
      }
      // Explanation-дағы секция атауына тура сәйкестік — ең жоғары бонус
      const explText = quizGroup.map(q => q.explanation).join(" ").toLowerCase();
      // Секция атауының негізгі сөзі explanation-да бар ма?
      const mainWord = titleWords.filter(w => w.length > 4)[0];
      if (mainWord && explText.includes(mainWord)) score += 10;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = si;
      }
    }
    return bestIdx;
  }

  // Әр квиз тобын секцияға тағайындау (жадный алгоритм — 1 группа на 1 секцию)
  const sectionToQuizzes: Map<number, QuizData[][]> = new Map();
  const assignedSections = new Set<number>();

  // Алдымен әр квизге барлық секцияның скорын есептеп, реттеу
  const assignments: Array<{ groupIdx: number; secIdx: number; score: number }> = [];
  for (let gi = 0; gi < sectionQuizzes.length; gi++) {
    const group = sectionQuizzes[gi];
    const quizText = group.map(q => q.question + " " + q.explanation).join(" ").toLowerCase();
    const explText = group.map(q => q.explanation).join(" ").toLowerCase();

    for (let si = 1; si < sections.length; si++) {
      const secLower = sections[si].toLowerCase();
      const firstLine = sections[si].split("\n")[0] || "";
      if (/не үшін керек|есте сақта|жиі қателер|⚠️|🧠/i.test(firstLine)) continue;
      if (sections[si].length < 80) continue;

      let score = 0;
      const keywords = secLower.match(/[а-яәіңғүұқөһёa-z0-9²³⁰⁴⁵]+/g) || [];
      const uniqueKeywords = [...new Set(keywords)].filter(k => k.length > 3);
      for (const kw of uniqueKeywords) {
        if (quizText.includes(kw)) score++;
      }
      const titleLine = sections[si].split("\n")[0]?.toLowerCase() || "";
      const titleWords = titleLine.match(/[а-яәіңғүұқөһёa-z]+/g) || [];
      for (const tw of titleWords) {
        if (tw.length > 3 && quizText.includes(tw)) score += 5;
        if (tw.length > 3 && explText.includes(tw)) score += 10;
      }
      if (score > 0) assignments.push({ groupIdx: gi, secIdx: si, score });
    }
  }

  // Скор бойынша сұрыптау (жоғарыдан төменге)
  assignments.sort((a, b) => b.score - a.score);

  // Жадный: әр квиз тобын ең жоғары скорлы бос секцияға тағайындау
  const assignedGroups = new Set<number>();
  for (const { groupIdx, secIdx } of assignments) {
    if (assignedGroups.has(groupIdx)) continue;
    if (assignedSections.has(secIdx)) continue;
    assignedGroups.add(groupIdx);
    assignedSections.add(secIdx);
    const existing = sectionToQuizzes.get(secIdx) || [];
    existing.push(sectionQuizzes[groupIdx]);
    sectionToQuizzes.set(secIdx, existing);
  }

  // Тағайындалмаған квиздерді секция ретімен бос секцияларға қою
  for (let gi = 0; gi < sectionQuizzes.length; gi++) {
    if (assignedGroups.has(gi)) continue;
    for (let si = 1; si < sections.length; si++) {
      if (assignedSections.has(si)) continue;
      const firstLine = sections[si].split("\n")[0] || "";
      if (/не үшін керек|есте сақта|жиі қателер|⚠️|🧠/i.test(firstLine)) continue;
      if (sections[si].length < 80) continue;
      assignedGroups.add(gi);
      assignedSections.add(si);
      const existing = sectionToQuizzes.get(si) || [];
      existing.push(sectionQuizzes[gi]);
      sectionToQuizzes.set(si, existing);
      break;
    }
  }

  // Секция түрін анықтау: intro/definition/summary → номерсіз, teaching → номер
  function getSectionType(section: string): "skip" | "teach" {
    const firstLine = section.split("\n")[0] || "";
    if (/не үшін керек|есте сақта|жиі қателер|⚠️|🧠/i.test(firstLine)) return "skip";
    if (/дегеніміз не/i.test(firstLine)) return "skip";
    if (section.length < 80) return "skip";
    return "teach";
  }

  const usedVisuals = new Set<string>();
  let teachingNum = 0;
  for (let i = 0; i < sections.length; i++) {
    const visual = detectVisuals(sections[i]);
    const uniqueVisual = visual && !usedVisuals.has(visual) ? visual : null;
    if (uniqueVisual) usedVisuals.add(uniqueVisual);

    // Номерлеу: тек оқу секцияларына ғана
    let sectionNumber: number | undefined;
    if (i === 0) {
      sectionNumber = undefined; // # Тақырып атауы
    } else if (getSectionType(sections[i]) === "teach") {
      teachingNum++;
      sectionNumber = teachingNum;
    } else {
      sectionNumber = undefined; // Кіріспе/қорытынды — номерсіз
    }

    combined.push({
      type: "section",
      html: renderTheoryHTML(sections[i], sectionNumber),
      visual: uniqueVisual,
      lesson: sectionToLesson.get(i),
    });
    // Осы секцияға тағайындалған квиздерді қою
    const quizzesForSection = sectionToQuizzes.get(i);
    if (quizzesForSection) {
      for (const group of quizzesForSection) {
        combined.push({ type: "quizGroup", items: group });
      }
    }
  }

  return (
    <div>
      {combined.map((item, i) =>
        item.type === "section" ? (
          <div key={`s-${i}`}>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
            {item.lesson && (
              <LessonVideo
                audioSrc={item.lesson.audioSrc}
                scenes={item.lesson.scenes}
                title={item.lesson.title}
                durationLabel={item.lesson.durationLabel}
              />
            )}
            {item.visual && <TheoryVisualBlock type={item.visual} />}
          </div>
        ) : (
          <div key={`qg-${i}`}>
            {item.items.map((quiz, j) => (
              <InlineQuiz key={`q-${i}-${j}`} quiz={quiz} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

// Визуал блок — автоматически вставляется по типу
function TheoryVisualBlock({ type }: { type: string }) {
  return (
    <div className="my-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎨</span>
        <span className="font-bold text-indigo-700 text-sm">Көрнекі түсіндірме</span>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {type === "fraction-intro" && <FractionVisual />}
        {type === "perimeter" && <PerimeterVisual />}
        {type === "area" && <AreaVisual />}
        {type === "angles" && <AnglesVisual />}
        {type === "circle" && <CircleVisual />}
      </div>
    </div>
  );
}

function FractionVisual() {
  const fractions = [
    { n: 1, d: 2, label: "1/2 — жартысы" },
    { n: 3, d: 4, label: "3/4 — төрттен үші" },
    { n: 3, d: 8, label: "3/8 — сегізден үші" },
  ];

  return (
    <>
      {fractions.map(({ n, d, label }) => {
        const size = 100;
        const cx = size / 2;
        const cy = size / 2;
        const r = 40;
        const slices = [];

        for (let i = 0; i < d; i++) {
          const startAngle = (i * 360) / d - 90;
          const endAngle = ((i + 1) * 360) / d - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);
          const largeArc = 360 / d > 180 ? 1 : 0;

          slices.push(
            <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
              fill={i < n ? "#f97316" : "#f3f4f6"} stroke="white" strokeWidth="2" />
          );
        }

        return (
          <div key={label} className="flex flex-col items-center gap-1">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {slices}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-bold text-gray-700">{label}</span>
          </div>
        );
      })}
    </>
  );
}

function PerimeterVisual() {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {/* Шаршы */}
      <div className="flex flex-col items-center">
        <svg width="120" height="140" viewBox="0 0 120 140">
          <rect x="20" y="20" width="80" height="80" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="8 4" rx="2" />
          <text x="60" y="14" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="12">5 см</text>
          <text x="105" y="64" fill="#3b82f6" fontWeight="bold" fontSize="12">5</text>
          <text x="60" y="118" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">P = 4×5 = 20</text>
        </svg>
        <span className="text-xs font-bold text-gray-600">Шаршы</span>
      </div>
      {/* Тіктөртбұрыш */}
      <div className="flex flex-col items-center">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <rect x="15" y="30" width="110" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8 4" rx="2" />
          <text x="70" y="24" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="12">8 см</text>
          <text x="130" y="64" fill="#f59e0b" fontWeight="bold" fontSize="12">3</text>
          <text x="70" y="112" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">P = 2(8+3) = 22</text>
        </svg>
        <span className="text-xs font-bold text-gray-600">Тіктөртбұрыш</span>
      </div>
    </div>
  );
}

function AreaVisual() {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {/* Тіктөртбұрыш */}
      <div className="flex flex-col items-center">
        <svg width="150" height="120" viewBox="0 0 150 120">
          <rect x="15" y="15" width="120" height="70" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" rx="2" />
          {/* Торча — аудан көрнекілігі */}
          {Array.from({ length: 6 }).map((_, col) =>
            Array.from({ length: 3 }).map((_, row) => (
              <rect key={`${col}-${row}`} x={17 + col * 20} y={17 + row * 23} width="18" height="21"
                fill="none" stroke="#86efac" strokeWidth="0.5" />
            ))
          )}
          <text x="75" y="10" textAnchor="middle" fill="#22c55e" fontWeight="bold" fontSize="12">a = 6</text>
          <text x="140" y="55" fill="#22c55e" fontWeight="bold" fontSize="12">b = 4</text>
          <text x="75" y="105" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">S = 6×4 = 24 см²</text>
        </svg>
        <span className="text-xs font-bold text-gray-600">S = a × b</span>
      </div>
      {/* Үшбұрыш */}
      <div className="flex flex-col items-center">
        <svg width="140" height="120" viewBox="0 0 140 120">
          <polygon points="15,90 125,90 70,20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="70" y1="20" x2="70" y2="90" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4" />
          <text x="78" y="60" fill="#dc2626" fontWeight="bold" fontSize="11">h=6</text>
          <text x="70" y="105" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="11">a=10</text>
          <text x="70" y="118" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="10">S = 10×6/2 = 30</text>
        </svg>
        <span className="text-xs font-bold text-gray-600">S = a×h/2</span>
      </div>
    </div>
  );
}

function AnglesVisual() {
  const angles = [
    { name: "Сүйір (45°)", deg: 45, color: "#22c55e" },
    { name: "Тік (90°)", deg: 90, color: "#3b82f6" },
    { name: "Доғал (135°)", deg: 135, color: "#f59e0b" },
  ];

  return (
    <>
      {angles.map((angle) => {
        const rad = (angle.deg * Math.PI) / 180;
        const len = 35;
        const ox = 15;
        const oy = 55;
        const x2 = ox + len * Math.cos(-rad);
        const y2 = oy - len * Math.sin(rad);

        return (
          <div key={angle.name} className="flex flex-col items-center">
            <svg width="80" height="70" viewBox="0 0 80 70">
              <line x1={ox} y1={oy} x2={ox + len + 10} y2={oy} stroke={angle.color} strokeWidth="2.5" />
              <line x1={ox} y1={oy} x2={x2} y2={y2} stroke={angle.color} strokeWidth="2.5" />
              {angle.deg === 90 && (
                <rect x={ox} y={oy - 10} width="10" height="10" fill="none" stroke={angle.color} strokeWidth="1.5" />
              )}
              <circle cx={ox} cy={oy} r="2" fill={angle.color} />
            </svg>
            <span className="text-xs font-bold" style={{ color: angle.color }}>{angle.name}</span>
          </div>
        );
      })}
    </>
  );
}

function CircleVisual() {
  const r = 35;
  const cx = 60;
  const cy = 55;

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="110" viewBox="0 0 120 110">
        <circle cx={cx} cy={cy} r={r} fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        {/* Радиус */}
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#dc2626" strokeWidth="2" />
        <text x={cx + r / 2} y={cy - 5} textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">r</text>
        {/* Диаметр */}
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
        <text x={cx} y={cy + r + 16} textAnchor="middle" fill="#7c3aed" fontWeight="bold" fontSize="10">d = 2r</text>
        <circle cx={cx} cy={cy} r="2.5" fill="#dc2626" />
      </svg>
      <div className="text-center text-xs space-y-0.5">
        <div className="font-bold text-purple-700">C = 2πr</div>
        <div className="font-bold text-purple-700">S = πr²</div>
      </div>
    </div>
  );
}
