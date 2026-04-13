import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Не авторизован" }, { status: 401 }), session: null };
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") {
    return { error: NextResponse.json({ error: "Нет доступа" }, { status: 403 }), session: null };
  }
  return { error: null, session };
}
