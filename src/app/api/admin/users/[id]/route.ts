import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import bcrypt from "bcryptjs";

// Update user (role, blocked, reset password)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};

  if (body.role !== undefined) updateData.role = body.role;
  if (body.blocked !== undefined) updateData.blocked = body.blocked;
  if (body.newPassword) {
    updateData.password = await bcrypt.hash(body.newPassword, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, blocked: true },
  });

  return NextResponse.json(user);
}

// Delete user
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  // Delete user's test results first
  await prisma.testResult.deleteMany({ where: { userId: id } });
  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
