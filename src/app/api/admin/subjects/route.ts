import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const subjects = await prisma.subject.findMany({
    include: { topics: { include: { questions: true }, orderBy: { order: "asc" } } },
  });
  return NextResponse.json(subjects);
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { name, slug, icon } = await req.json();
  if (!name || !slug) {
    return NextResponse.json({ error: "Заполните название и slug" }, { status: 400 });
  }

  const subject = await prisma.subject.create({ data: { name, slug, icon: icon || "📚" } });
  return NextResponse.json(subject);
}
