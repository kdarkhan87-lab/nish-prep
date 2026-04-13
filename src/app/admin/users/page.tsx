"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TestResult {
  id: string;
  score: number;
  total: number;
  topicId: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  grade: number;
  createdAt: string;
  results: TestResult[];
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const role = (session?.user as { role?: string })?.role;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    if (status === "authenticated" && role !== "admin") router.push("/");
    if (status === "authenticated" && role === "admin") {
      fetch("/api/admin/users")
        .then((r) => r.json())
        .then((data) => { setUsers(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status, role, router]);

  if (status === "loading" || loading) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-center"><p className="text-gray-500">Загрузка...</p></div>;
  }

  if (role !== "admin") return null;

  const students = users.filter(u => u.role !== "admin");
  const admins = users.filter(u => u.role === "admin");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">👥 Пользователи</h1>
          <p className="text-gray-500">Всего: {users.length} ({students.length} учеников, {admins.length} админов)</p>
        </div>
        <Link href="/admin" className="text-blue-600 hover:underline">&larr; Админ-панель</Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{users.length}</div>
          <div className="text-sm text-blue-600">Всего</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{students.length}</div>
          <div className="text-sm text-green-600">Учеников</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">
            {users.reduce((a, u) => a + u.results.length, 0)}
          </div>
          <div className="text-sm text-purple-600">Тестов сдано</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">
            {(() => {
              const all = users.flatMap(u => u.results);
              if (all.length === 0) return "—";
              return Math.round(all.reduce((a, r) => a + (r.score / r.total) * 100, 0) / all.length) + "%";
            })()}
          </div>
          <div className="text-sm text-orange-600">Средний балл</div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Имя</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
              <th className="text-center px-6 py-3 text-sm font-semibold text-gray-600">Класс</th>
              <th className="text-center px-6 py-3 text-sm font-semibold text-gray-600">Роль</th>
              <th className="text-center px-6 py-3 text-sm font-semibold text-gray-600">Тестов</th>
              <th className="text-center px-6 py-3 text-sm font-semibold text-gray-600">Ср. балл</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Регистрация</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const avg = user.results.length > 0
                ? Math.round(user.results.reduce((a, r) => a + (r.score / r.total) * 100, 0) / user.results.length)
                : null;
              const isExpanded = expandedUser === user.id;

              return (
                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedUser(isExpanded ? null : user.id)}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{user.grade}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role === "admin" ? "Админ" : "Ученик"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{user.results.length}</td>
                  <td className="px-6 py-4 text-center">
                    {avg !== null ? (
                      <span className={`text-sm font-bold ${avg >= 70 ? "text-green-600" : avg >= 40 ? "text-orange-600" : "text-red-600"}`}>
                        {avg}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>Пока нет зарегистрированных пользователей</p>
        </div>
      )}
    </div>
  );
}
