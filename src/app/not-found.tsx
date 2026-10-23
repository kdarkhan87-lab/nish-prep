import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow-md p-10">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Бет табылмады</h1>
        <p className="text-gray-500 mb-6">
          Мұндай бет жоқ немесе жылжытылған. Пәндер тізіміне өтіп, қажетті тақырыпты таңда.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/subjects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            📚 Пәндер
          </Link>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Басты бет
          </Link>
        </div>
      </div>
    </div>
  );
}
