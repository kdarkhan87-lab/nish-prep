import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TheoryRenderer } from "@/components/TheoryRenderer";
import { LessonVideoByKey } from "@/components/LessonVideoByKey";
import type { LessonKey } from "@/data/lessons";

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

      {/* Интро-видео над теорией */}
      {topic.subject.slug === "math" && (() => {
        const introMap: Record<number, LessonKey> = {
          1: "lesson-01-natural-numbers",
          2: "lesson-t02-intro-shamalar",
          3: "lesson-t03-intro",
          4: "lesson-t04-intro",
          5: "lesson-t05-intro",
          6: "lesson-t06-intro",
          7: "lesson-t07-intro",
          8: "lesson-t08-intro",
          9: "lesson-t09-intro",
          10: "lesson-t10-intro",
          11: "lesson-t11-intro",
          12: "lesson-t12-intro",
          13: "lesson-t13-intro",
          14: "lesson-t14-intro",
          15: "lesson-t15-intro",
        };
        const key = introMap[topic.order];
        return key ? <LessonVideoByKey lessonKey={key} /> : null;
      })()}

      {/* Теория + инлайн quiz + секционные видео */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <TheoryRenderer
          theory={topic.theory}
          quizzes={quizzes}
          sectionLessonKeys={
            topic.subject.slug !== "math"
              ? []
              : topic.order === 1
              ? (["lesson-02-razryad", "lesson-03-amaldar-reti", "lesson-04-darezhe", "lesson-05-addition-properties", "lesson-06-multiplication-properties"] as LessonKey[])
              : topic.order === 2
              ? (["lesson-t02-length", "lesson-t02-mass", "lesson-t02-time", "lesson-t02-area", "lesson-t02-volume", "lesson-t02-speed", "lesson-t02-compare"] as LessonKey[])
              : topic.order === 3
              ? (["lesson-t03-divisibility", "lesson-t03-prime", "lesson-t03-factor", "lesson-t03-gcd", "lesson-t03-lcm"] as LessonKey[])
              : topic.order === 4
              ? (["lesson-t04-what", "lesson-t04-types", "lesson-t04-reduce", "lesson-t04-add", "lesson-t04-subtract", "lesson-t04-multiply", "lesson-t04-divide", "lesson-t04-compare"] as LessonKey[])
              : topic.order === 5
              ? (["lesson-t05-what", "lesson-t05-digits", "lesson-t05-compare", "lesson-t05-addsubtract", "lesson-t05-multiply", "lesson-t05-divide", "lesson-t05-convert"] as LessonKey[])
              : topic.order === 6
              ? (["lesson-t06-what", "lesson-t06-find", "lesson-t06-inverse", "lesson-t06-change"] as LessonKey[])
              : topic.order === 7
              ? (["lesson-t07-ratio", "lesson-t07-what", "lesson-t07-unknown", "lesson-t07-direct", "lesson-t07-inverse", "lesson-t07-scale"] as LessonKey[])
              : topic.order === 8
              ? (["lesson-t08-set", "lesson-t08-module", "lesson-t08-compare", "lesson-t08-addsubtract", "lesson-t08-multdiv"] as LessonKey[])
              : topic.order === 9
              ? (["lesson-t09-what", "lesson-t09-simple", "lesson-t09-complex", "lesson-t09-word"] as LessonKey[])
              : topic.order === 10
              ? (["lesson-t10-numeric", "lesson-t10-similar", "lesson-t10-brackets", "lesson-t10-formulas"] as LessonKey[])
              : topic.order === 11
              ? (["lesson-t11-perimeter", "lesson-t11-area", "lesson-t11-angles"] as LessonKey[])
              : topic.order === 12
              ? (["lesson-t12-plane", "lesson-t12-quadrants", "lesson-t12-distance"] as LessonKey[])
              : topic.order === 13
              ? (["lesson-t13-axis", "lesson-t13-other", "lesson-t13-shapes"] as LessonKey[])
              : topic.order === 14
              ? (["lesson-t14-motion", "lesson-t14-work", "lesson-t14-algorithm"] as LessonKey[])
              : topic.order === 15
              ? (["lesson-t15-what", "lesson-t15-ops", "lesson-t15-venn"] as LessonKey[])
              : []
          }
        />
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
