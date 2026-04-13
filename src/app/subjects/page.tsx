import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    include: { topics: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Пәндер</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{subject.icon}</span>
              <h2 className="text-2xl font-bold text-gray-800">{subject.name}</h2>
            </div>

            <div className="space-y-3">
              {subject.topics.map((topic, i) => (
                <Link
                  key={topic.id}
                  href={`/subjects/${subject.slug}/${topic.id}`}
                  className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 p-4 rounded-xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition">
                      {topic.name}
                    </span>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
