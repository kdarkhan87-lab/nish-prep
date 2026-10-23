import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const gradeRaw = Number(body?.grade);
    const grade = Number.isInteger(gradeRaw) && gradeRaw >= 1 && gradeRaw <= 11 ? gradeRaw : 5;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов` },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Этот email уже зарегистрирован" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, grade },
    });

    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error("[register] failed", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
