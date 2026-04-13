import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { name, slug, icon } = await req.json();

  const subject = await prisma.subject.update({
    where: { id },
    data: { name, slug, icon },
  });
  return NextResponse.json(subject);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.question.deleteMany({ where: { topic: { subjectId: id } } });
  await prisma.topic.deleteMany({ where: { subjectId: id } });
  await prisma.subject.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
