"use client";

import { useState } from "react";

export interface QuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function InlineQuiz({ quiz }: { quiz: QuizItem }) {
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
      // Дұрыс жауап — бірден көрсет
      setRevealed(true);
    } else {
      // Қате — шайқау анимациясы + қайта таңдауға мүмкіндік
      setShake(true);
      setTimeout(() => setShake(false), 500);
      // 2 қате болса — жауапты көрсет
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
          {revealed ? "" : "Түсіндің бе? Тексеріп көр!"}
        </span>
      </div>

      <p className="font-bold text-gray-800 mb-3">{quiz.question}</p>

      <div className={`space-y-2 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
        {quiz.options.map((opt, i) => {
          let style = "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer active:scale-[0.98]";

          if (revealed) {
            if (i === quiz.correct) {
              style = "border-green-400 bg-green-100 text-green-800 font-bold scale-[1.02]";
            } else if (i === selected && i !== quiz.correct) {
              style = "border-red-400 bg-red-50 text-red-400 line-through";
            } else {
              style = "border-gray-200 bg-gray-50 text-gray-400";
            }
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
              <span className="font-bold mr-2">
                {String.fromCharCode(65 + i)})
              </span>
              {opt}
              {revealed && i === quiz.correct && " ✅"}
              {revealed && i === selected && i !== quiz.correct && " ❌"}
            </button>
          );
        })}
      </div>

      {/* Подсказка при первой ошибке */}
      {!revealed && selected !== null && !isCorrect && (
        <div className="mt-3 p-3 rounded-lg text-sm bg-orange-50 border border-orange-200">
          <span className="font-bold text-orange-700">🤔 Дұрыс емес.</span>{" "}
          <span className="text-orange-600">Тағы бір рет ойлап көр!</span>
        </div>
      )}

      {/* Объяснение после reveal */}
      {revealed && (
        <div
          className={`mt-3 p-4 rounded-xl text-sm ${
            isCorrect
              ? "bg-green-100 border border-green-300"
              : "bg-red-100 border border-red-300"
          }`}
        >
          <div className="font-bold mb-1">
            {isCorrect ? "🎉 Жарайсың! Дұрыс жауап!" : "💡 Дұрыс жауап:"}
          </div>
          <p className="text-gray-700">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
