import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const { answers, questionIds } = await req.json();

  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: { topic: { include: { subject: true } } },
  });

  let score = 0;
  const byTopic: Record<string, { correct: number; total: number; name: string }> = {};

  const details = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) score++;

    // Тақырып бойынша статистика
    if (!byTopic[q.topicId]) {
      byTopic[q.topicId] = { correct: 0, total: 0, name: q.topic.name };
    }
    byTopic[q.topicId].total++;
    if (isCorrect) byTopic[q.topicId].correct++;

    return {
      questionId: q.id,
      text: q.text,
      options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
      userAnswer: userAnswer ?? -1,
      correctAnswer: q.answer,
      isCorrect,
      explanation: q.explanation || "",
      topicName: q.topic.name,
      subjectName: q.topic.subject.name,
    };
  });

  const topicStats = Object.values(byTopic).map((t) => ({
    name: t.name,
    correct: t.correct,
    total: t.total,
    percentage: Math.round((t.correct / t.total) * 100),
  }));

  return NextResponse.json({
    score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    details,
    topicStats,
  });
}
