import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const error = await requireAdmin();
  if (error) return error;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      grade: true,
      createdAt: true,
      results: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          score: true,
          total: true,
          topicId: true,
          createdAt: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}
