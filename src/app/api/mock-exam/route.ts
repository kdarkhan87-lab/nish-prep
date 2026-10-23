import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_EXAM_SIZE, parseOptions, pickBalancedQuestions } from "@/lib/mock-exam";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Барлық сұрақтарды алу
    const allQuestions = await prisma.question.findMany({
      include: { topic: { include: { subject: true } } },
    });

    // Әр тақырыптан тең бөліп, барлығы 30-ға дейін (немесе бар сұрақтардың саны)
    const selected = pickBalancedQuestions(allQuestions, MOCK_EXAM_SIZE);

    const payload = selected.map((q) => ({
      id: q.id,
      text: q.text,
      options: parseOptions(q.options),
      topicName: q.topic.name,
      subjectName: q.topic.subject.name,
    }));

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[mock-exam] GET failed", err);
    return NextResponse.json({ error: "Сұрақтарды жүктеу мүмкін болмады" }, { status: 500 });
  }
}
