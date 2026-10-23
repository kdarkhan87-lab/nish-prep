import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseOptions } from "@/lib/mock-exam";

type Answers = Record<string, number>;

function readAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Answers = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === "number" && Number.isInteger(v) && v >= 0) out[k] = v;
  }
  return out;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const topicId = typeof body?.topicId === "string" ? body.topicId : "";
  const answers = readAnswers(body?.answers);

  if (!topicId) {
    return NextResponse.json({ error: "Тақырып көрсетілмеген" }, { status: 400 });
  }

  const questions = await prisma.question.findMany({ where: { topicId } });
  if (questions.length === 0) {
    return NextResponse.json({ error: "Бұл тақырыпта сұрақтар жоқ" }, { status: 404 });
  }

  let score = 0;

  const details = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) score++;

    return {
      questionId: q.id,
      text: q.text,
      options: parseOptions(q.options),
      userAnswer: userAnswer ?? -1,
      correctAnswer: q.answer,
      isCorrect,
      explanation: q.explanation || "",
    };
  });

  const total = questions.length;
  const result = await prisma.testResult.create({
    data: { score, total, userId, topicId },
  });

  return NextResponse.json({
    id: result.id,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    details,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  const results = await prisma.testResult.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(results);
}
