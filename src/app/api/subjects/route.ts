import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subjects = await prisma.subject.findMany({
    include: { topics: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(subjects);
}
