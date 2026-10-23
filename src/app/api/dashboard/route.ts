import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Авторизация қажет" }, { status: 401 });
  }

  try {
    const progress = await getUserProgress(userId);
    return NextResponse.json(progress);
  } catch (err) {
    console.error("[dashboard] failed", err);
    return NextResponse.json({ error: "Деректерді жүктеу мүмкін болмады" }, { status: 500 });
  }
}
