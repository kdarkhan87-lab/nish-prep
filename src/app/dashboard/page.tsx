"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TestResultData {
  id: string;
  score: number;
  total: number;
  topicId: string;
  createdAt: string;
}

interface TopicInfo {
  id: string;
  name: string;
  subjectName: string;
  subjectSlug: string;
  order: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [results, setResults] = useState<TestResultData[]>([]);
  const [topics, setTopics] = useState<Record<string, TopicInfo>>({});
  const [loading, setLoading] = useState(true);
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/results").then((r) => r.json()),
      fetch("/api/subjects").then((r) => r.json()),
    ]).then(([resultsData, subjectsData]) => {
      setResults(resultsData);

      const topicMap: Record<string, TopicInfo> = {};
      for (const subject of subjectsData) {
        for (const topic of subject.topics) {
          topicMap[topic.id] = {
            id: topic.id,
            name: topic.name,
            subjectName: subject.name,
            subjectSlug: subject.slug,
            order: topic.order,
          };
        }
      }
      setTopics(topicMap);
      setNowMs(Date.now());
      setLoading(false);
    });
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl animate-pulse">📊</div>
        <p className="text-gray-500 mt-4">Деректер жүктелуде...</p>
      </div>
    );
  }

  if (!session) return null;

  const totalTests = results.length;
  const avgScore =
    totalTests > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / totalTests)
      : 0;
  const bestScore =
    totalTests > 0
      ? Math.max(...results.map((r) => Math.round((r.score / r.total) * 100)))
      : 0;
  const attemptedTopicIds = new Set(results.map((r) => r.topicId));
  const sortedTopics = Object.values(topics).sort((a, b) => {
    if (a.subjectSlug === b.subjectSlug) return a.order - b.order;
    if (a.subjectSlug === "math") return -1;
    if (b.subjectSlug === "math") return 1;
    return a.subjectSlug.localeCompare(b.subjectSlug);
  });
  const resultsWithPct = results
    .map((r) => ({ ...r, pct: Math.round((r.score / r.total) * 100), topic: topics[r.topicId] }))
    .filter((r) => r.topic);
  const weakestResult = [...resultsWithPct].sort((a, b) => a.pct - b.pct)[0];
  const nextNewTopic = sortedTopics.find((topic) => !attemptedTopicIds.has(topic.id));
  const hasWeakTopic = weakestResult ? weakestResult.pct < 75 : false;
  const recommendedTopic = totalTests === 0 ? sortedTopics[0] : hasWeakTopic ? weakestResult?.topic : nextNewTopic;
  const recommendationType =
    totalTests === 0 ? "Старт" : hasWeakTopic ? "Қайталау" : "Жаңа тақырып";
  const recommendationText =
    totalTests === 0
      ? "Алдымен теорияны оқып, қысқа тест тапсыр. Бірінші нәтиже жеке жоспарды ашады."
      : hasWeakTopic && weakestResult
      ? `${weakestResult.topic.name} тақырыбында ${weakestResult.pct}%. Мақсат: 80%+ нәтижеге көтеру.`
      : "Жақсы жүріп келесің. Енді жаңа тақырыпты ашып, серияны жалғастыр.";
  const activeDays = new Set(results.map((r) => new Date(r.createdAt).toDateString())).size;
  const lastResultDate = results[0]?.createdAt ? new Date(results[0].createdAt) : null;
  const daysSinceLast = lastResultDate
    ? Math.floor(((nowMs ?? lastResultDate.getTime()) - lastResultDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Сәлем, {session.user?.name}! 👋
      </h1>
      <p className="text-gray-500 mb-8">
        {daysSinceLast === null
          ? "Бүгін алғашқы қадамыңды бастайық"
          : daysSinceLast === 0
          ? "Бүгін дайындық жасалды. Енді келесі қадамды бекітейік"
          : `${daysSinceLast} күн үзіліс болды. Қысқа тапсырмадан қайта бастайық`}
      </p>

      {/* Daily plan */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 md:p-7 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-sm font-medium mb-3">
              🎯 Бүгінгі жоспар · {recommendationType}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {recommendedTopic ? recommendedTopic.name : "Дайындық жоспары"}
            </h2>
            <p className="text-blue-100 max-w-2xl">{recommendationText}</p>
          </div>
          {recommendedTopic && (
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:w-52">
              <Link
                href={`/subjects/${recommendedTopic.subjectSlug}/${recommendedTopic.id}/theory`}
                className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-xl font-bold text-center transition"
              >
                Теория
              </Link>
              <Link
                href={`/subjects/${recommendedTopic.subjectSlug}/${recommendedTopic.id}/test`}
                className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl font-bold text-center transition"
              >
                Тест тапсыру
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Тест тапсырылды", value: totalTests, icon: "📝", color: "blue" },
          { label: "Орташа балл", value: `${avgScore}%`, icon: "📊", color: "orange" },
          { label: "Ең жақсы нәтиже", value: `${bestScore}%`, icon: "🏆", color: "green" },
          { label: "Белсенді күн", value: activeDays, icon: "🔥", color: "red" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Results */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Тест тарихы</h2>

      {results.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-500 mb-4">Сіз әлі тест тапсырмадыңыз</p>
          <Link
            href="/subjects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Дайындықты бастау
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r) => {
            const topic = topics[r.topicId];
            const pct = Math.round((r.score / r.total) * 100);
            return (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {topic?.name || "Тақырып"}{" "}
                    <span className="text-sm text-gray-400">({topic?.subjectName})</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString("kk-KZ", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-orange-500" : "bg-red-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={`font-bold text-sm ${
                      pct >= 80 ? "text-green-600" : pct >= 50 ? "text-orange-600" : "text-red-600"
                    }`}
                  >
                    {r.score}/{r.total} ({pct}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
