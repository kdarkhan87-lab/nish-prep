import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { text, options, answer, topicId, explanation } = await req.json();
  if (!text || !options || answer === undefined || !topicId) {
    return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: {
      text,
      options: typeof options === "string" ? options : JSON.stringify(options),
      answer,
      explanation: explanation || "",
      topicId,
    },
  });
  return NextResponse.json(question);
}
