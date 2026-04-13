import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;
  const questions = await prisma.question.findMany({
    where: { topicId },
  });

  // Сұрақтарды қосылу ретімен сақтау (жеңілден қиынға)
  const formatted = questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: JSON.parse(q.options),
  }));

  return NextResponse.json(formatted);
}
