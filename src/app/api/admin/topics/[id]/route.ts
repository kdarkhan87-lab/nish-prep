import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const topic = await prisma.topic.findUnique({
    where: { id },
    include: { questions: true, subject: true },
  });
  if (!topic) return NextResponse.json({ error: "Тема не найдена" }, { status: 404 });
  return NextResponse.json(topic);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { name, theory, order, quizzes } = await req.json();

  const topic = await prisma.topic.update({
    where: { id },
    data: { name, theory, order, ...(quizzes !== undefined && { quizzes: typeof quizzes === "string" ? quizzes : JSON.stringify(quizzes) }) },
  });
  return NextResponse.json(topic);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.question.deleteMany({ where: { topicId: id } });
  await prisma.topic.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
