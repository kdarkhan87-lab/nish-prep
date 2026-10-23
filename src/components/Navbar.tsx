"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  match?: (path: string) => boolean;
}

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = (session?.user as { role?: string })?.role;
  const closeMenu = () => setMenuOpen(false);

  const items: NavItem[] = [
    { href: "/subjects", label: "📚 Пәндер", match: (p) => p.startsWith("/subjects") },
    { href: "/mock-exam", label: "🎯 Емтихан" },
  ];
  if (session) {
    items.push({ href: "/dashboard", label: "📊 Кабинет", match: (p) => p.startsWith("/dashboard") });
  }
  if (role === "admin") {
    items.push({ href: "/admin", label: "⚙️ Админ", match: (p) => p.startsWith("/admin") });
  }

  const isActive = (item: NavItem) => (item.match ? item.match(pathname) : pathname === item.href);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-lg md:text-xl font-bold flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🎓</span>
            <span>НИШ/БИЛ Дайындық</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(item) ? "bg-white/20 text-white" : "text-blue-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <span className="text-blue-200 text-sm ml-3 mr-1 max-w-[140px] truncate" title={session.user?.name ?? ""}>
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition text-sm"
                >
                  Шығу
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="ml-3 bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-lg transition font-medium text-sm"
              >
                Кіру
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Мәзірді жабу" : "Мәзірді ашу"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item) ? "page" : undefined}
                className={`px-3 py-3 rounded-lg font-medium transition ${
                  isActive(item) ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-left px-3 py-3 rounded-lg hover:bg-white/10"
              >
                Шығу <span className="text-blue-200 text-sm">({session.user?.name})</span>
              </button>
            ) : (
              <Link href="/auth/login" onClick={closeMenu} className="px-3 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 font-medium text-center mt-1">
                Кіру
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
