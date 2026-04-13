import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: { topics: { orderBy: { order: "asc" }, include: { questions: true } } },
  });

  if (!subject) notFound();

  // Оқушының нәтижелерін алу
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  let topicResults: Record<string, { best: number; total: number; attempts: number }> = {};

  if (userId) {
    const results = await prisma.testResult.findMany({
      where: { userId, topicId: { in: subject.topics.map((t) => t.id) } },
    });

    for (const r of results) {
      const pct = Math.round((r.score / r.total) * 100);
      const existing = topicResults[r.topicId];
      if (!existing || pct > existing.best) {
        topicResults[r.topicId] = {
          best: pct,
          total: r.total,
          attempts: (existing?.attempts || 0) + 1,
        };
      } else {
        topicResults[r.topicId] = {
          ...existing,
          attempts: existing.attempts + 1,
        };
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/subjects" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Барлық пәндер
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{subject.icon}</span>
        <h1 className="text-3xl font-bold text-gray-800">{subject.name}</h1>
      </div>

      <div className="space-y-4">
        {subject.topics.map((topic, i) => {
          const result = topicResults[topic.id];
          const pct = result?.best ?? -1;

          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between gap-4"
            >
              {/* Сол жақ: нөмір + атау */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{topic.name}</h3>
                  <p className="text-sm text-gray-500">{topic.questions.length} сұрақ</p>
                </div>
              </div>

              {/* Орта: батырмалар */}
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/subjects/${slug}/${topic.id}/theory`}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded-lg font-medium transition text-sm"
                >
                  📚 Теория
                </Link>
                <Link
                  href={`/subjects/${slug}/${topic.id}/test`}
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-2 rounded-lg font-medium transition text-sm"
                >
                  ✏️ Тест
                </Link>
              </div>

              {/* Оң жақ: прогресс (Тесттен кейін) */}
              <div className="flex-shrink-0 w-28">
                {pct >= 0 ? (
                  <div className="text-center">
                    <div
                      className={`text-2xl font-extrabold ${
                        pct >= 80 ? "text-green-600" : pct >= 50 ? "text-orange-500" : "text-red-500"
                      }`}
                    >
                      {pct}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-orange-400" : "bg-red-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {result.attempts} рет
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-gray-300 text-lg font-bold">—</div>
                    <p className="text-xs text-gray-400">тапсырылмаған</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
