"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function NewTopicForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subjectId") || "";
  const subjectName = searchParams.get("subjectName") || "Предмет";

  const [name, setName] = useState("");
  const [theory, setTheory] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, theory, subjectId }),
    });
    if (res.ok) {
      router.push("/admin");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Админ-панель</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Новая тема</h1>
      <p className="text-gray-500 mb-6">Предмет: {subjectName}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название темы</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800"
            placeholder="Например: Дроби"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Теория (Markdown)
          </label>
          <textarea
            value={theory}
            onChange={(e) => setTheory(e.target.value)}
            rows={15}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm text-gray-800"
            placeholder="# Заголовок\n\n## Подзаголовок\n\nТекст теории с **жирным** и *курсивом*..."
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {saving ? "Сохраняю..." : "Создать тему"}
          </button>
          <Link href="/admin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function NewTopicPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-500">Загрузка...</div>}>
      <NewTopicForm />
    </Suspense>
  );
}
