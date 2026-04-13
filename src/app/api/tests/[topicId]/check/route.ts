import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { questionId, answer } = await req.json();

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    return NextResponse.json({ error: "Сұрақ табылмады" }, { status: 404 });
  }

  return NextResponse.json({
    correct: question.answer,
    isCorrect: answer === question.answer,
    explanation: question.explanation || "",
  });
}
