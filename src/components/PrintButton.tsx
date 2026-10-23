"use client";

export function PrintButton({ label = "🖨️ Басып шығару / PDF" }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition print:hidden"
    >
      {label}
    </button>
  );
}
