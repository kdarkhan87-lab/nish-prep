"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditTopicPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [theory, setTheory] = useState("");
  const [order, setOrder] = useState(1);
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/topics/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setName(data.name);
        setTheory(data.theory);
        setOrder(data.order);
        setSubjectName(data.subject?.name || "");
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/admin/topics/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, theory, order }),
    });
    setSaving(false);
    router.push("/admin");
  }

  async function handleDelete() {
    if (!confirm(`Удалить тему "${name}" и все её вопросы?`)) return;
    await fetch(`/api/admin/topics/${id}`, { method: "DELETE" });
    router.push("/admin");
  }

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-500">Загрузка...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Админ-панель</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Редактировать тему</h1>
      <p className="text-gray-500 mb-6">Предмет: {subjectName}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Теория (Markdown)</label>
          <textarea
            value={theory}
            onChange={(e) => setTheory(e.target.value)}
            rows={20}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm text-gray-800"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {saving ? "Сохраняю..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Удалить тему
          </button>
          <Link href="/admin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
