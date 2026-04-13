import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { text, options, answer, explanation } = await req.json();

  const question = await prisma.question.update({
    where: { id },
    data: {
      text,
      options: typeof options === "string" ? options : JSON.stringify(options),
      answer,
      ...(explanation !== undefined && { explanation }),
    },
  });
  return NextResponse.json(question);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.question.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
