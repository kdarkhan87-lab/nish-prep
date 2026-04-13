"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface QuestionDetail {
  questionId: string;
  text: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

interface Result {
  score: number;
  total: number;
  percentage: number;
  details: QuestionDetail[];
}

export default function TestPage() {
  const { slug, topicId } = useParams<{ slug: string; topicId: string }>();
  const { data: session } = useSession();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Мгновенная обратная связь
  const [instantFeedback, setInstantFeedback] = useState<{
    questionId: string;
    selected: number;
    correct: number;
    explanation: string;
  } | null>(null);

  // Таймер
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(15);

  useEffect(() => {
    if (!timerEnabled || timeLeft <= 0 || result) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnabled, timeLeft, result]);

  function startTimer() {
    setTimerEnabled(true);
    setTimeLeft(timerMinutes * 60);
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    fetch(`/api/tests/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [topicId]);

  function selectAnswer(questionId: string, optionIndex: number) {
    if (answers[questionId] !== undefined) return; // Жауап берілген, өзгертуге болмайды
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));

    // Мгновенная обратная связь - проверяем через API
    fetch(`/api/tests/${topicId}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer: optionIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInstantFeedback({
          questionId,
          selected: optionIndex,
          correct: data.correct,
          explanation: data.explanation || "",
        });
      })
      .catch(() => {
        // Если API не работает — пропускаем feedback
      });
  }

  async function submitTest() {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, answers }),
    });

    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl animate-pulse">📝</div>
        <p className="text-gray-500 mt-4">Тест жүктелуде...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  // ========== НӘТИЖЕ БЕТІ ==========
  if (result) {
    const emoji = result.percentage >= 80 ? "🎉" : result.percentage >= 50 ? "👍" : "💪";
    const message =
      result.percentage >= 80
        ? "Керемет нәтиже! Сен жақсы білесің!"
        : result.percentage >= 50
        ? "Жақсы, бірақ жақсартуға болады!"
        : "Материалды қайталау керек!";

    const stars = result.percentage >= 90 ? 3 : result.percentage >= 70 ? 2 : result.percentage >= 50 ? 1 : 0;
    const wrongCount = result.details.filter((d) => !d.isCorrect).length;

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{emoji}</div>

          {/* Жұлдыздар */}
          {stars > 0 && (
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`text-3xl ${s <= stars ? "text-yellow-400" : "text-gray-200"}`}>
                  ★
                </span>
              ))}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Тест нәтижесі</h2>
          <p className="text-gray-500 mb-6">{message}</p>

          <div className="text-5xl font-bold text-blue-600 mb-2">
            {result.score}/{result.total}
          </div>
          <div className="text-lg text-gray-500 mb-4">{result.percentage}% дұрыс жауап</div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                result.percentage >= 80
                  ? "bg-green-500"
                  : result.percentage >= 50
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">{result.score}</div>
              <div className="text-xs text-green-600">Дұрыс ✓</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
              <div className="text-xs text-red-600">Қате ✗</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-600">{result.total}</div>
              <div className="text-xs text-blue-600">Барлығы</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              {showDetails ? "Жауаптарды жасыру" : "📋 Толық талдау"}
            </button>
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrent(0);
                setShowDetails(false);
                setInstantFeedback(null);
                setLoading(true);
                fetch(`/api/tests/${topicId}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setQuestions(data);
                    setLoading(false);
                  });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              🔄 Қайта тапсыру
            </button>
            <Link
              href={`/subjects/${slug}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition"
            >
              Тақырыптарға
            </Link>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Сұрақтар бойынша талдау</h3>

            {result.details.map((d, i) => (
              <div
                key={d.questionId}
                className={`rounded-2xl p-5 border-2 ${
                  d.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      d.isCorrect ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {d.isCorrect ? "✓" : "✗"}
                  </span>
                  <div>
                    <span className="text-xs text-gray-400">#{i + 1}</span>
                    <h4 className="font-bold text-gray-800">{d.text}</h4>
                  </div>
                </div>

                <div className="space-y-2 ml-11">
                  {d.options.map((opt, j) => {
                    const isUserChoice = d.userAnswer === j;
                    const isCorrectAnswer = d.correctAnswer === j;

                    let style = "bg-white border-gray-200 text-gray-600";
                    let icon = "";

                    if (isCorrectAnswer) {
                      style = "bg-green-100 border-green-400 text-green-800 font-medium";
                      icon = " ✓";
                    }
                    if (isUserChoice && !isCorrectAnswer) {
                      style = "bg-red-100 border-red-400 text-red-800 line-through";
                      icon = " ✗";
                    }

                    return (
                      <div key={j} className={`px-4 py-2 rounded-lg border text-sm ${style}`}>
                        <span className="font-bold mr-2">{String.fromCharCode(65 + j)}</span>
                        {opt}
                        {icon}
                        {isCorrectAnswer && (
                          <span className="ml-2 text-green-600 text-xs font-medium">— дұрыс жауап</span>
                        )}
                        {isUserChoice && !isCorrectAnswer && (
                          <span className="ml-2 text-red-600 text-xs font-medium">— сенің жауабың</span>
                        )}
                      </div>
                    );
                  })}

                  {!d.isCorrect && d.explanation && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-500">💡</span>
                        <span className="font-bold text-blue-700 text-xs">ТҮСІНДІРМЕ</span>
                      </div>
                      <p className="text-blue-800">{d.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {wrongCount > 0 && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mt-6">
                <h4 className="font-bold text-orange-800 mb-2">
                  💡 Кеңес: {wrongCount} сұрақта қателестің
                </h4>
                <p className="text-orange-700 text-sm">
                  Қате жауаптарға назар аудар. Теорияны қайта оқып, содан кейін тестті қайта тапсыр.
                </p>
                <Link
                  href={`/subjects/${slug}/${topicId}/theory`}
                  className="inline-block mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition text-sm"
                >
                  📚 Теорияны қайта оқу
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ========== ТЕСТ БЕТІ ==========
  const q = questions[current];
  const currentFeedback = instantFeedback?.questionId === q.id ? instantFeedback : null;
  const hasAnswered = answers[q.id] !== undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={`/subjects/${slug}`} className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Тақырыптарға оралу
      </Link>

      {/* Таймер басқару */}
      {!timerEnabled && !result && (
        <div className="flex items-center gap-3 mb-4 bg-white rounded-xl p-3 shadow-sm">
          <span className="text-sm text-gray-500">⏱️ Таймер:</span>
          <select
            value={timerMinutes}
            onChange={(e) => setTimerMinutes(Number(e.target.value))}
            className="border rounded-lg px-2 py-1 text-sm text-gray-700"
          >
            <option value={10}>10 мин</option>
            <option value={15}>15 мин</option>
            <option value={20}>20 мин</option>
            <option value={30}>30 мин</option>
          </select>
          <button
            onClick={startTimer}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium transition"
          >
            Таймерді қосу
          </button>
          <span className="text-xs text-gray-400">немесе таймерсіз шеш</span>
        </div>
      )}

      {/* Таймер көрсету */}
      {timerEnabled && !result && (
        <div className={`text-center mb-4 py-2 rounded-xl font-bold text-lg ${
          timeLeft <= 60 ? "bg-red-100 text-red-700 animate-pulse" :
          timeLeft <= 180 ? "bg-orange-100 text-orange-700" :
          "bg-blue-100 text-blue-700"
        }`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      )}

      {/* Прогресс */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm text-gray-500">
          {current + 1}-сұрақ / {questions.length}
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Жауап берілген / берілмеген санауыш */}
      <div className="flex items-center gap-2 mb-6 text-xs">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
          ✓ {answeredCount} жауап берілді
        </span>
        {unansweredCount > 0 && (
          <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-medium">
            {unansweredCount} қалды
          </span>
        )}
      </div>

      {/* Сұрақ */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{q.text}</h2>

        <div className="space-y-3">
          {q.options.map((option, i) => {
            let btnStyle = "border-gray-200 hover:border-blue-300 text-gray-700 cursor-pointer";

            if (currentFeedback) {
              if (i === currentFeedback.correct) {
                btnStyle = "border-green-500 bg-green-50 text-green-800 font-bold";
              } else if (i === currentFeedback.selected && i !== currentFeedback.correct) {
                btnStyle = "border-red-500 bg-red-50 text-red-700 line-through";
              } else {
                btnStyle = "border-gray-200 text-gray-400";
              }
            } else if (hasAnswered && answers[q.id] === i) {
              btnStyle = "border-blue-600 bg-blue-50 text-blue-700";
            } else if (hasAnswered) {
              btnStyle = "border-gray-200 text-gray-400 cursor-not-allowed";
            }

            return (
              <button
                key={i}
                onClick={() => selectAnswer(q.id, i)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${btnStyle}`}
              >
                <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 mr-3 text-sm font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
                {currentFeedback && i === currentFeedback.correct && " ✅"}
                {currentFeedback && i === currentFeedback.selected && i !== currentFeedback.correct && " ❌"}
              </button>
            );
          })}
        </div>

        {/* Мгновенная обратная связь */}
        {currentFeedback && (
          <div className={`mt-4 p-4 rounded-xl text-sm ${
            currentFeedback.selected === currentFeedback.correct
              ? "bg-green-100 border border-green-300"
              : "bg-red-100 border border-red-300"
          }`}>
            <div className="font-bold mb-1">
              {currentFeedback.selected === currentFeedback.correct
                ? "🎉 Дұрыс!"
                : "❌ Қате жауап."}
            </div>
            {currentFeedback.explanation && (
              <p className="text-gray-700">{currentFeedback.explanation}</p>
            )}
            {currentFeedback.selected !== currentFeedback.correct && (
              <p className="text-gray-600 mt-1">
                Дұрыс жауап: <strong>{String.fromCharCode(65 + currentFeedback.correct)}</strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => {
            setInstantFeedback(null);
            setCurrent((c) => Math.max(0, c - 1));
          }}
          disabled={current === 0}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition disabled:opacity-30"
        >
          &larr; Артқа
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => {
              setInstantFeedback(null);
              setCurrent((c) => c + 1);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Келесі &rarr;
          </button>
        ) : unansweredCount > 0 ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-orange-600 font-medium">
              ⚠️ {unansweredCount} сұраққа жауап бер
            </span>
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed"
            >
              Тестті аяқтау ✓
            </button>
          </div>
        ) : (
          <button
            onClick={submitTest}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {submitting ? "Тексерілуде..." : "Тестті аяқтау ✓"}
          </button>
        )}
      </div>

      {/* Сұрақ нүктелері */}
      <div className="flex gap-2 justify-center mt-6 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setInstantFeedback(null);
              setCurrent(i);
            }}
            className={`w-8 h-8 rounded-full text-xs font-bold transition ${
              i === current
                ? "bg-blue-600 text-white ring-2 ring-blue-300"
                : answers[questions[i].id] !== undefined
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
