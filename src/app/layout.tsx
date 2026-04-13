import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "НИШ/БИЛ Дайындық — Математика және Логика",
  description: "5-6 сынып оқушыларына НИШ және БИЛ-ге түсуге дайындық онлайн-платформасы",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 font-[family-name:var(--font-geist)]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-800 text-white py-6 text-center text-sm">
            <p>НИШ/БИЛ Дайындық — 2026. Емтиханда сәттілік!</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
