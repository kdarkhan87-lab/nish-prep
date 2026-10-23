"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MOCK_EXAM_DURATION_SEC, MOCK_EXAM_SIZE } from "@/lib/mock-exam";

interface Question {
  id: string;
  text: string;
  options: string[];
  topicName: string;
  subjectName: string;
}

interface QuestionDetail {
  questionId: string;
  text: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
  topicName: string;
  subjectName: string;
}

interface TopicStat {
  name: string;
  topicId?: string;
  subjectSlug?: string;
  correct: number;
  total: number;
  percentage: number;
}

interface Result {
  score: number;
  total: number;
  percentage: number;
  details: QuestionDetail[];
  topicStats: TopicStat[];
}

export default function MockExamPage() {
  const { data: session } = useSession();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Таймер — 60 минут
  const [timeLeft, setTimeLeft] = useState(MOCK_EXAM_DURATION_SEC);

  const submitExam = useCallback(async () => {
    if (!session || submitting || questions.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/mock-exam/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          questionIds: questions.map((q) => q.id),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.score !== "number") {
        throw new Error(data?.error || "Нәтижені тексеру мүмкін болмады");
      }
      setResult(data as Result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Нәтижені тексеру мүмкін болмады");
    } finally {
      setSubmitting(false);
    }
  }, [session, submitting, answers, questions]);

  // Таймер тек бір рет іске қосылады; әр секундта қайта жасалмайды
  useEffect(() => {
    if (!started || result) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, result]);

  // Уақыт біткенде — автоматты тапсыру (side effect setState ішінде емес)
  const submitRef = useRef(submitExam);
  useEffect(() => {
    submitRef.current = submitExam;
  }, [submitExam]);
  useEffect(() => {
    if (started && !result && timeLeft === 0) {
      submitRef.current();
    }
  }, [started, result, timeLeft]);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  async function startExam() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mock-exam", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !Array.isArray(data)) {
        throw new Error(data?.error || "Сұрақтарды жүктеу мүмкін болмады");
      }
      if (data.length === 0) {
        throw new Error("Базада әзірше сұрақтар жоқ. Кейінірек қайталап көріңіз.");
      }
      setQuestions(data);
      setAnswers({});
      setCurrent(0);
      setStarted(true);
      setTimeLeft(MOCK_EXAM_DURATION_SEC);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Сұрақтарды жүктеу мүмкін болмады");
    } finally {
      setLoading(false);
    }
  }

  function finishExam() {
    const unanswered = questions.length - Object.keys(answers).length;
    if (unanswered > 0) {
      const ok = window.confirm(
        `${unanswered} сұраққа жауап берілмеді. Бәрібір емтиханды аяқтайсыз ба?`
      );
      if (!ok) return;
    }
    submitExam();
  }

  // ========== БАСТАУ БЕТІ ==========
  if (!started && !result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Пробный экзамен НИШ/БИЛ</h1>
          <div className="text-gray-500 mb-8 space-y-2">
            <p>Нақты емтихан форматы:</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{MOCK_EXAM_SIZE}</div>
                <div className="text-xs text-blue-600">сұрақ</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-600">{MOCK_EXAM_DURATION_SEC / 60}</div>
                <div className="text-xs text-orange-600">минут</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">Микс</div>
                <div className="text-xs text-green-600">барлық тақырып</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-amber-800 text-sm">
              <strong>Ескерту:</strong> Емтихан басталғаннан кейін таймер жұмыс істейді.
              60 минут біткенде тест автоматты түрде тапсырылады. Дайын болсаңыз — бастаңыз!
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={startExam}
            disabled={loading || !session}
            className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition disabled:opacity-50 shadow-lg"
          >
            {loading ? "Жүктелуде..." : !session ? "Кіру қажет" : "Емтиханды бастау"}
          </button>

          {!session && (
            <p className="mt-4 text-sm text-gray-400">
              <Link href="/auth/login" className="text-blue-600 hover:underline">Кіріңіз</Link> — нәтижені сақтау үшін
            </p>
          )}
        </div>
      </div>
    );
  }

  // ========== НӘТИЖЕ БЕТІ ==========
  if (result) {
    const emoji = result.percentage >= 80 ? "🎉" : result.percentage >= 60 ? "👍" : result.percentage >= 40 ? "💪" : "📚";
    const message =
      result.percentage >= 80 ? "Тамаша! НИШ-ке дайынсың!" :
      result.percentage >= 60 ? "Жақсы нәтиже, бірақ жақсартуға болады!" :
      result.percentage >= 40 ? "Орташа. Әлсіз тақырыптарды қайтала!" :
      "Материалды қайталау керек!";

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Пробный емтихан нәтижесі</h2>
          <p className="text-gray-500 mb-4">{message}</p>

          <div className="text-5xl font-bold text-blue-600 mb-2">
            {result.score}/{result.total}
          </div>
          <div className="text-lg text-gray-500 mb-1">{result.percentage}% дұрыс</div>
          {(() => {
            const skipped = result.details.filter((d) => d.userAnswer === -1).length;
            return skipped > 0 ? (
              <div className="text-sm text-gray-400 mb-6">
                жауапсыз қалды: {skipped} сұрақ — келесі жолы барлығына жауап беруге тырыс
              </div>
            ) : (
              <div className="mb-6" />
            );
          })()}

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                result.percentage >= 80 ? "bg-green-500" :
                result.percentage >= 60 ? "bg-blue-500" :
                result.percentage >= 40 ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>

          {/* Тақырып бойынша статистика */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 text-left">Тақырып бойынша нәтиже:</h3>
          <div className="space-y-2 mb-6">
            {[...result.topicStats]
              .sort((a, b) => a.percentage - b.percentage)
              .map((t) => (
                <div key={t.name} className="flex items-center gap-3 text-sm">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    t.percentage >= 80 ? "bg-green-500" :
                    t.percentage >= 50 ? "bg-orange-500" : "bg-red-500"
                  }`} />
                  <span className="flex-1 text-left text-gray-700">{t.name}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        t.percentage >= 80 ? "bg-green-500" :
                        t.percentage >= 50 ? "bg-orange-500" : "bg-red-500"
                      }`}
                      style={{ width: `${t.percentage}%` }}
                    />
                  </div>
                  <span className={`font-bold w-16 text-right ${
                    t.percentage >= 80 ? "text-green-600" :
                    t.percentage >= 50 ? "text-orange-600" : "text-red-600"
                  }`}>
                    {t.correct}/{t.total}
                  </span>
                  {t.percentage < 80 && t.topicId && t.subjectSlug ? (
                    <Link
                      href={`/subjects/${t.subjectSlug}/${t.topicId}/theory`}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-md transition flex-shrink-0"
                      title="Теорияны қайталау"
                    >
                      📚 Қайталау
                    </Link>
                  ) : (
                    <span className="w-[82px] flex-shrink-0" />
                  )}
                </div>
              ))}
          </div>

          {/* Келесі қадам — әлсіз тақырыптар */}
          {(() => {
            const weak = result.topicStats.filter((t) => t.percentage < 80 && t.topicId && t.subjectSlug);
            if (weak.length === 0) return null;
            const worst = [...weak].sort((a, b) => a.percentage - b.percentage)[0];
            return (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-left">
                <div className="font-bold text-orange-800 mb-1">💡 Келесі қадам</div>
                <p className="text-sm text-orange-700">
                  Ең әлсіз тақырып — <strong>{worst.name}</strong> ({worst.percentage}%). Теориясын қайта оқып,
                  тақырып бойынша тест тапсыр, сосын емтиханды қайталап көр.
                </p>
                <Link
                  href={`/subjects/${worst.subjectSlug}/${worst.topicId}/theory`}
                  className="inline-block mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
                >
                  📚 {worst.name} — теория
                </Link>
              </div>
            );
          })()}

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
                setStarted(false);
                setAnswers({});
                setCurrent(0);
                setShowDetails(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              🔄 Қайта тапсыру
            </button>
            <Link href="/dashboard" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
              📊 Менің кабинетім
            </Link>
            <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
              Басты бет
            </Link>
          </div>
        </div>

        {/* Толық талдау */}
        {showDetails && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Сұрақтар бойынша талдау</h3>
            {result.details.map((d, i) => (
              <div key={d.questionId} className={`rounded-2xl p-5 border-2 ${
                d.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    d.isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {d.isCorrect ? "✓" : "✗"}
                  </span>
                  <div>
                    <span className="text-xs text-gray-400">#{i+1} · {d.topicName}</span>
                    <h4 className="font-bold text-gray-800">{d.text}</h4>
                  </div>
                </div>
                <div className="space-y-2 ml-11">
                  {d.options.map((opt, j) => {
                    const isUser = d.userAnswer === j;
                    const isCorrect = d.correctAnswer === j;
                    let style = "bg-white border-gray-200 text-gray-600";
                    if (isCorrect) style = "bg-green-100 border-green-400 text-green-800 font-medium";
                    if (isUser && !isCorrect) style = "bg-red-100 border-red-400 text-red-800 line-through";

                    return (
                      <div key={j} className={`px-4 py-2 rounded-lg border text-sm ${style}`}>
                        <span className="font-bold mr-2">{String.fromCharCode(65+j)}</span>
                        {opt}
                        {isCorrect && <span className="ml-2 text-green-600 text-xs"> — дұрыс жауап</span>}
                        {isUser && !isCorrect && <span className="ml-2 text-red-600 text-xs"> — сенің жауабың</span>}
                      </div>
                    );
                  })}
                  {!d.isCorrect && d.explanation && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm">
                      <span className="text-blue-500">💡</span>
                      <span className="font-bold text-blue-700 text-xs ml-1">ТҮСІНДІРМЕ: </span>
                      <span className="text-blue-800">{d.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ========== ТЕСТ БЕТІ ==========
  const q = questions[current];
  const answeredCount = Object.keys(answers).length;

  if (!q) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-600 mb-6">Сұрақтар табылмады. Емтиханды қайта бастаңыз.</p>
          <button
            onClick={() => { setStarted(false); setQuestions([]); setAnswers({}); setCurrent(0); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Басына қайту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}
      {/* Таймер + прогресс */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 font-medium">
          Пробный емтихан НИШ/БИЛ
        </span>
        <div className={`px-4 py-2 rounded-xl font-bold text-lg ${
          timeLeft <= 120 ? "bg-red-100 text-red-700 animate-pulse" :
          timeLeft <= 300 ? "bg-orange-100 text-orange-700" :
          "bg-blue-100 text-blue-700"
        }`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Прогресс */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">
          {current + 1}-сұрақ / {questions.length} · жауап: {answeredCount}/{questions.length}
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Тақырып белгісі */}
      <div className="text-xs text-gray-400 mb-2">
        {q.subjectName} · {q.topicName}
      </div>

      {/* Сұрақ */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{q.text}</h2>
        <div className="space-y-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
              className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${
                answers[q.id] === i
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-300 text-gray-700"
              }`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 mr-3 text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Навигация */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition disabled:opacity-30"
        >
          &larr; Артқа
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Келесі &rarr;
          </button>
        ) : (
          <button
            onClick={finishExam}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition disabled:opacity-30"
          >
            {submitting ? "Тексерілуде..." : `Емтиханды аяқтау (${answeredCount}/${questions.length})`}
          </button>
        )}
      </div>

      {/* Сұрақ нүктелері */}
      <div className="flex gap-1.5 justify-center mt-6 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition ${
              i === current ? "bg-blue-600 text-white" :
              answers[questions[i].id] !== undefined ? "bg-green-100 text-green-700" :
              "bg-gray-200 text-gray-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
