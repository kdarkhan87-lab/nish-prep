import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Барлық сұрақтарды алу
  const allQuestions = await prisma.question.findMany({
    include: { topic: { include: { subject: true } } },
  });

  // Тақырып бойынша топтау
  const byTopic: Record<string, typeof allQuestions> = {};
  for (const q of allQuestions) {
    const key = q.topicId;
    if (!byTopic[key]) byTopic[key] = [];
    byTopic[key].push(q);
  }

  // Әр тақырыптан 1-2 сұрақ алу, барлығы 30 сұрақ
  const selected: typeof allQuestions = [];
  const topicIds = Object.keys(byTopic);

  // 1-ші раунд: әр тақырыптан 1 сұрақ
  for (const tid of topicIds) {
    const questions = byTopic[tid];
    const shuffled = questions.sort(() => Math.random() - 0.5);
    if (shuffled.length > 0) selected.push(shuffled[0]);
  }

  // 2-ші раунд: 30-ға дейін толтыру
  while (selected.length < 30) {
    const tid = topicIds[Math.floor(Math.random() * topicIds.length)];
    const questions = byTopic[tid];
    const remaining = questions.filter((q) => !selected.some((s) => s.id === q.id));
    if (remaining.length > 0) {
      selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
    }
  }

  // Рандомизация
  const shuffled = selected.sort(() => Math.random() - 0.5).map((q) => ({
    id: q.id,
    text: q.text,
    options: JSON.parse(q.options),
    topicName: q.topic.name,
    subjectName: q.topic.subject.name,
  }));

  return NextResponse.json(shuffled);
}
