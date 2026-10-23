export default function SubjectsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse" aria-busy="true" aria-label="Жүктелуде">
      <div className="h-9 w-40 bg-gray-200 rounded-lg mb-8" />
      <div className="grid md:grid-cols-2 gap-8">
        {[0, 1].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              <div className="h-6 w-48 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-12 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
