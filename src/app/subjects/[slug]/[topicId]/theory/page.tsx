import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TheoryRenderer } from "@/components/TheoryRenderer";

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ slug: string; topicId: string }>;
}) {
  const { slug, topicId } = await params;
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: { subject: true, questions: true },
  });

  if (!topic) notFound();

  // quizzes JSON парсинг
  let quizzes = [];
  try {
    quizzes = JSON.parse(topic.quizzes || "[]");
  } catch {
    quizzes = [];
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={`/subjects/${slug}`} className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-1 text-sm">
        &larr; {topic.subject.name}
      </Link>

      {/* Теория + инлайн quiz */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <TheoryRenderer theory={topic.theory} quizzes={quizzes} />
      </div>

      {/* Есте сақта блогы */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🧠</span>
          <h3 className="font-bold text-amber-800">Есте сақта!</h3>
        </div>
        <p className="text-amber-700 text-sm">
          Теорияны оқығаннан кейін тест тапсыр. Қателескен сұрақтарды қайта қара — солай ғана білім бекиді!
        </p>
      </div>

      {/* Тест батырмасы */}
      <div className="mt-6 flex gap-4 justify-center flex-wrap">
        <Link
          href={`/subjects/${slug}/${topicId}/test`}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl"
        >
          ✏️ Тест тапсыру
        </Link>
        <Link
          href={`/subjects/${slug}`}
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition"
        >
          Тақырыптарға
        </Link>
      </div>

      <p className="text-center text-gray-400 text-sm mt-4">
        Бұл тақырып бойынша {topic.questions.length} сұрақ бар
      </p>
    </div>
  );
}
