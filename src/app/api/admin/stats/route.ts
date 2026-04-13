import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const error = await requireAdmin();
  if (error) return error;

  const [userCount, subjectCount, topicCount, questionCount, resultCount] = await Promise.all([
    prisma.user.count(),
    prisma.subject.count(),
    prisma.topic.count(),
    prisma.question.count(),
    prisma.testResult.count(),
  ]);

  const results = await prisma.testResult.findMany({
    select: { score: true, total: true },
  });

  const avgScore = results.length > 0
    ? Math.round(results.reduce((a, r) => a + (r.score / r.total) * 100, 0) / results.length)
    : 0;

  const recentResults = await prisma.testResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  // Get topic names for results
  const topicIds = [...new Set(recentResults.map(r => r.topicId))];
  const topics = await prisma.topic.findMany({
    where: { id: { in: topicIds } },
    select: { id: true, name: true },
  });
  const topicMap = Object.fromEntries(topics.map(t => [t.id, t.name]));

  const recentWithTopics = recentResults.map(r => ({
    ...r,
    topicName: topicMap[r.topicId] || "Неизвестная тема",
  }));

  return NextResponse.json({
    userCount,
    subjectCount,
    topicCount,
    questionCount,
    resultCount,
    avgScore,
    recentResults: recentWithTopics,
  });
}
