import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MOCK_EXAM_TOPIC_ID, parseOptions } from "@/lib/mock-exam";

type Answers = Record<string, number>;

function readAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Answers = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === "number" && Number.isInteger(v) && v >= 0) out[k] = v;
  }
  return out;
}

function readQuestionIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return Array.from(new Set(raw.filter((x): x is string => typeof x === "string" && x.length > 0)));
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
  const answers = readAnswers(body?.answers);
  const questionIds = readQuestionIds(body?.questionIds);

  if (questionIds.length === 0) {
    return NextResponse.json({ error: "Сұрақтар тізімі бос" }, { status: 400 });
  }

  const found = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: { topic: { include: { subject: true } } },
  });

  // Сақтау реті — емтихандағы сұрақтардың реті
  const byId = new Map(found.map((q) => [q.id, q]));
  const questions = questionIds.map((id) => byId.get(id)).filter((q) => q !== undefined);

  if (questions.length === 0) {
    return NextResponse.json({ error: "Сұрақтар табылмады" }, { status: 404 });
  }

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
      options: parseOptions(q.options),
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
    percentage: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
  }));

  const total = questions.length;

  // Нәтижені сақтау — жеке кабинетте және рейтингте көрінеді
  let resultId: string | null = null;
  try {
    const saved = await prisma.testResult.create({
      data: { score, total, userId, topicId: MOCK_EXAM_TOPIC_ID },
    });
    resultId = saved.id;
  } catch (err) {
    // Сақталмаса да нәтижені көрсетеміз
    console.error("[mock-exam] failed to save result", err);
  }

  return NextResponse.json({
    id: resultId,
    score,
    total,
    percentage: total > 0 ? Math.round((score / total) * 100) : 0,
    details,
    topicStats,
  });
}
