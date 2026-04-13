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
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [results, setResults] = useState<TestResultData[]>([]);
  const [topics, setTopics] = useState<Record<string, TopicInfo>>({});
  const [loading, setLoading] = useState(true);

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
          };
        }
      }
      setTopics(topicMap);
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Сәлем, {session.user?.name}! 👋
      </h1>
      <p className="text-gray-500 mb-8">Дайындық статистикаң</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Тест тапсырылды", value: totalTests, icon: "📝", color: "blue" },
          { label: "Орташа балл", value: `${avgScore}%`, icon: "📊", color: "orange" },
          { label: "Ең жақсы нәтиже", value: `${bestScore}%`, icon: "🏆", color: "green" },
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
