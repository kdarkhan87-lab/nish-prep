import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    include: { topics: { orderBy: { order: "asc" } } },
  });

  // Get user results
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  let topicResults: Record<string, number> = {};

  if (userId) {
    const results = await prisma.testResult.findMany({
      where: { userId },
    });
    for (const r of results) {
      const pct = Math.round((r.score / r.total) * 100);
      if (!topicResults[r.topicId] || pct > topicResults[r.topicId]) {
        topicResults[r.topicId] = pct;
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Пәндер</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => {
          const subjectTopicIds = subject.topics.map(t => t.id);
          const completedTopics = subjectTopicIds.filter(id => topicResults[id] !== undefined).length;
          const avgScore = completedTopics > 0
            ? Math.round(subjectTopicIds.reduce((sum, id) => sum + (topicResults[id] ?? 0), 0) / completedTopics)
            : null;

          return (
            <div key={subject.id} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-5xl">{subject.icon}</span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{subject.name}</h2>
                </div>
                {avgScore !== null && (
                  <div className="text-right">
                    <div className={`text-lg font-bold ${avgScore >= 70 ? "text-green-600" : avgScore >= 40 ? "text-orange-500" : "text-red-500"}`}>
                      {avgScore}%
                    </div>
                    <div className="text-xs text-gray-400">{completedTopics}/{subject.topics.length}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {subject.topics.map((topic, i) => {
                  const pct = topicResults[topic.id];
                  const hasResult = pct !== undefined;

                  return (
                    <Link
                      key={topic.id}
                      href={`/subjects/${subject.slug}/${topic.id}`}
                      className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-3 rounded-xl transition group"
                    >
                      <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-medium text-gray-700 group-hover:text-blue-600 transition flex-1 min-w-0 truncate">
                        {topic.name}
                      </span>
                      {hasResult ? (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-16 bg-gray-200 rounded-full h-2 hidden sm:block">
                            <div
                              className={`h-2 rounded-full ${pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-orange-400" : "bg-red-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold min-w-[36px] text-right ${pct >= 70 ? "text-green-600" : pct >= 40 ? "text-orange-500" : "text-red-500"}`}>
                            {pct}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-300 group-hover:text-blue-400 transition flex-shrink-0">&rarr;</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
