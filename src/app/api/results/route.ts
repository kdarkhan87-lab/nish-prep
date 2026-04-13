import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const { topicId, answers } = await req.json();
  const userId = (session.user as { id: string }).id;

  const questions = await prisma.question.findMany({ where: { topicId } });
  let score = 0;

  const details = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) score++;

    const options = typeof q.options === "string" ? JSON.parse(q.options) : q.options;

    return {
      questionId: q.id,
      text: q.text,
      options,
      userAnswer: userAnswer ?? -1,
      correctAnswer: q.answer,
      isCorrect,
      explanation: q.explanation || "",
    };
  });

  const result = await prisma.testResult.create({
    data: { score, total: questions.length, userId, topicId },
  });

  return NextResponse.json({
    id: result.id,
    score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    details,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const results = await prisma.testResult.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(results);
}
