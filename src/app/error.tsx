"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow-md p-10">
        <div className="text-6xl mb-4">😵‍💫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Бірдеңе дұрыс болмады</h1>
        <p className="text-gray-500 mb-6">
          Қате орын алды, бірақ сенің прогресің сақталды. Бетті қайта жүктеп көр.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            🔄 Қайта жүктеу
          </button>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Басты бет
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-300 font-mono">код: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
