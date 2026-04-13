"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Question { id: string; text: string; options: string; answer: number }
interface Topic { id: string; name: string; theory: string; order: number; questions: Question[] }
interface Subject { id: string; name: string; slug: string; icon: string; topics: Topic[] }

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // New subject form
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newIcon, setNewIcon] = useState("📚");
  const [showForm, setShowForm] = useState(false);

  const role = (session?.user as { role?: string })?.role;

  const loadData = useCallback(() => {
    fetch("/api/admin/subjects")
      .then((r) => r.json())
      .then((data) => { setSubjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    if (status === "authenticated" && role !== "admin") router.push("/");
    if (status === "authenticated" && role === "admin") loadData();
  }, [status, role, router, loadData]);

  async function createSubject(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, slug: newSlug, icon: newIcon }),
    });
    setNewName(""); setNewSlug(""); setNewIcon("📚"); setShowForm(false);
    loadData();
  }

  async function deleteSubject(id: string, name: string) {
    if (!confirm(`Удалить предмет "${name}" и все его темы/вопросы?`)) return;
    await fetch(`/api/admin/subjects/${id}`, { method: "DELETE" });
    loadData();
  }

  if (status === "loading" || loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><p className="text-gray-500">Загрузка...</p></div>;
  }

  if (role !== "admin") return null;

  const totalTopics = subjects.reduce((a, s) => a + s.topics.length, 0);
  const totalQuestions = subjects.reduce((a, s) => a + s.topics.reduce((b, t) => b + t.questions.length, 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Админ-панель</h1>
          <p className="text-gray-500">Управление контентом платформы</p>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">На сайт &rarr;</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{subjects.length}</div>
          <div className="text-sm text-blue-600">Предметов</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{totalTopics}</div>
          <div className="text-sm text-green-600">Тем</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">{totalQuestions}</div>
          <div className="text-sm text-orange-600">Вопросов</div>
        </div>
      </div>

      {/* Add subject */}
      <div className="mb-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            + Добавить предмет
          </button>
        ) : (
          <form onSubmit={createSubject} className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="font-bold text-gray-800">Новый предмет</h3>
            <div className="grid grid-cols-3 gap-4">
              <input
                placeholder="Название (напр. Математика)"
                value={newName}
                onChange={(e) => { setNewName(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-zа-я0-9]/g, "-")); }}
                required
                className="px-4 py-2 border rounded-lg text-gray-800"
              />
              <input
                placeholder="Slug (напр. math)"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                required
                className="px-4 py-2 border rounded-lg text-gray-800"
              />
              <input
                placeholder="Иконка (эмодзи)"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-800"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                Создать
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Subjects list */}
      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{subject.name}</h2>
                  <span className="text-sm text-gray-400">/{subject.slug}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/topics/new?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}`}
                  className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium"
                >
                  + Тема
                </Link>
                <button
                  onClick={() => deleteSubject(subject.id, subject.name)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium"
                >
                  Удалить
                </button>
              </div>
            </div>

            {subject.topics.length === 0 ? (
              <p className="text-gray-400 text-sm">Нет тем. Добавьте первую тему.</p>
            ) : (
              <div className="space-y-2">
                {subject.topics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <span className="font-medium text-gray-700">{topic.name}</span>
                      <span className="text-sm text-gray-400 ml-2">({topic.questions.length} вопросов)</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/topics/${topic.id}`}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm"
                      >
                        Редактировать
                      </Link>
                      <Link
                        href={`/admin/topics/${topic.id}/questions`}
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-lg text-sm"
                      >
                        Вопросы ({topic.questions.length})
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
