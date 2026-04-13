"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, grade }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Тіркелу</h1>
        <p className="text-center text-gray-500 mb-6">Аккаунт аш және дайындықты баста</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Аты-жөні</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
              placeholder="Атыңды жаз"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Құпия сөз</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
              placeholder="Кемінде 6 таңба"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сынып</label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
            >
              <option value={5}>5 сынып</option>
              <option value={6}>6 сынып</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Тіркелу..." : "Тіркелу"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Аккаунтыңыз бар ма?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
            Кіру
          </Link>
        </p>
      </div>
    </div>
  );
}
