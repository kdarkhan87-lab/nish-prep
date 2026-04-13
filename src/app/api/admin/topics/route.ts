import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { name, theory, order, subjectId } = await req.json();
  if (!name || !subjectId) {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  const topicCount = await prisma.topic.count({ where: { subjectId } });
  const topic = await prisma.topic.create({
    data: { name, theory: theory || "", order: order || topicCount + 1, subjectId },
  });
  return NextResponse.json(topic);
}
