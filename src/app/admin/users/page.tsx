"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
  blocked: boolean;
  createdAt: string;
  results: TestResult[];
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [resetPasswordId, setResetPasswordId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const role = (session?.user as { role?: string })?.role;
  const myEmail = session?.user?.email;

  const loadUsers = useCallback(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    if (status === "authenticated" && role !== "admin") router.push("/");
    if (status === "authenticated" && role === "admin") loadUsers();
  }, [status, role, router, loadUsers]);

  async function toggleRole(user: User) {
    if (user.email === myEmail) return alert("Нельзя менять свою роль!");
    const newRole = user.role === "admin" ? "student" : "admin";
    if (!confirm(`Сменить роль ${user.name} на "${newRole === "admin" ? "Админ" : "Ученик"}"?`)) return;
    setActionLoading(user.id);
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    loadUsers();
    setActionLoading(null);
  }

  async function toggleBlock(user: User) {
    if (user.email === myEmail) return alert("Нельзя заблокировать себя!");
    const action = user.blocked ? "разблокировать" : "заблокировать";
    if (!confirm(`${action} ${user.name}?`)) return;
    setActionLoading(user.id);
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocked: !user.blocked }),
    });
    loadUsers();
    setActionLoading(null);
  }

  async function deleteUser(user: User) {
    if (user.email === myEmail) return alert("Нельзя удалить себя!");
    if (!confirm(`УДАЛИТЬ пользователя ${user.name} (${user.email})? Это действие необратимо!`)) return;
    setActionLoading(user.id);
    await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    loadUsers();
    setActionLoading(null);
  }

  async function resetPassword(userId: string) {
    if (!newPassword || newPassword.length < 4) return alert("Пароль минимум 4 символа");
    setActionLoading(userId);
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });
    setResetPasswordId(null);
    setNewPassword("");
    setActionLoading(null);
    alert("Пароль сброшен!");
  }

  if (status === "loading" || loading) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-center"><p className="text-gray-500">Загрузка...</p></div>;
  }

  if (role !== "admin") return null;

  const students = users.filter(u => u.role !== "admin");
  const admins = users.filter(u => u.role === "admin");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Пользователи</h1>
          <p className="text-gray-500">Всего: {users.length} ({students.length} учеников, {admins.length} админов)</p>
        </div>
        <Link href="/admin" className="text-blue-600 hover:underline">&larr; Админ-панель</Link>
      </div>

      {/* Stats */}
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
          <div className="text-2xl font-bold text-purple-700">{users.reduce((a, u) => a + u.results.length, 0)}</div>
          <div className="text-sm text-purple-600">Тестов сдано</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">
            {(() => {
              const all = users.flatMap(u => u.results);
              if (all.length === 0) return "\u2014";
              return Math.round(all.reduce((a, r) => a + (r.score / r.total) * 100, 0) / all.length) + "%";
            })()}
          </div>
          <div className="text-sm text-orange-600">Средний балл</div>
        </div>
      </div>

      {/* Users list */}
      <div className="space-y-3">
        {users.map((user) => {
          const avg = user.results.length > 0
            ? Math.round(user.results.reduce((a, r) => a + (r.score / r.total) * 100, 0) / user.results.length)
            : null;
          const isMe = user.email === myEmail;
          const isLoading = actionLoading === user.id;

          return (
            <div key={user.id} className={`bg-white rounded-xl shadow-sm border p-4 ${user.blocked ? "opacity-60 border-red-200 bg-red-50" : ""}`}>
              <div className="flex items-center justify-between">
                {/* User info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{user.name}</span>
                      {isMe && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Вы</span>}
                      {user.blocked && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Заблокирован</span>}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mr-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Класс</div>
                    <div className="text-sm font-medium text-gray-700">{user.grade}</div>
                  </div>
                  <div className="text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role === "admin" ? "Админ" : "Ученик"}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Тестов</div>
                    <div className="text-sm font-medium text-gray-700">{user.results.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Ср. балл</div>
                    <div className={`text-sm font-bold ${avg !== null ? (avg >= 70 ? "text-green-600" : avg >= 40 ? "text-orange-600" : "text-red-600") : "text-gray-400"}`}>
                      {avg !== null ? `${avg}%` : "\u2014"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Дата</div>
                    <div className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString("ru-RU")}</div>
                  </div>
                </div>

                {/* Actions */}
                {!isMe && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRole(user)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
                      title={user.role === "admin" ? "Сделать учеником" : "Сделать админом"}
                    >
                      {user.role === "admin" ? "Убрать админа" : "Дать админа"}
                    </button>
                    <button
                      onClick={() => toggleBlock(user)}
                      disabled={isLoading}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                        user.blocked
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      } disabled:opacity-50`}
                    >
                      {user.blocked ? "Разблокировать" : "Заблокировать"}
                    </button>
                    <button
                      onClick={() => { setResetPasswordId(resetPasswordId === user.id ? null : user.id); setNewPassword(""); }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    >
                      Пароль
                    </button>
                    <button
                      onClick={() => deleteUser(user)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>

              {/* Reset password form */}
              {resetPasswordId === user.id && (
                <div className="mt-3 flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                  <span className="text-sm text-gray-600">Новый пароль:</span>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Минимум 4 символа"
                    className="px-3 py-1.5 border rounded-lg text-sm text-gray-800 flex-1"
                  />
                  <button
                    onClick={() => resetPassword(user.id)}
                    disabled={isLoading}
                    className="text-xs px-4 py-1.5 rounded-lg font-medium bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Сбросить
                  </button>
                  <button
                    onClick={() => { setResetPasswordId(null); setNewPassword(""); }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
