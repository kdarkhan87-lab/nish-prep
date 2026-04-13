"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = (session?.user as { role?: string })?.role;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            НИШ/БІЛ Дайындық
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/subjects" className="hover:text-blue-200 transition">
              Пәндер
            </Link>
            <Link href="/mock-exam" className="hover:text-blue-200 transition">
              🎯 Емтихан
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200 transition">
                  Менің кабинетім
                </Link>
                {role === "admin" && (
                  <Link href="/admin" className="hover:text-blue-200 transition">
                    Админ
                  </Link>
                )}
                <span className="text-blue-200 text-sm">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition text-sm"
                >
                  Шығу
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-lg transition font-medium"
              >
                Кіру
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/subjects" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              Пәндер
            </Link>
            <Link href="/mock-exam" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              🎯 Емтихан
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>
                  Менің кабинетім
                </Link>
                <button onClick={() => signOut()} className="text-left hover:text-blue-200">
                  Шығу ({session.user?.name})
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>
                Кіру
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
