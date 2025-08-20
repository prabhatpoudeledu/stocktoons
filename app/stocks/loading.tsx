export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {/* Header Loading */}
          <div className="text-center space-y-4">
            <div className="h-12 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full w-64 mx-auto"></div>
            <div className="h-16 bg-gradient-to-r from-violet-200 to-purple-200 rounded w-96 mx-auto"></div>
            <div className="h-6 bg-gradient-to-r from-slate-200 to-indigo-200 rounded w-80 mx-auto"></div>
          </div>

          {/* Market Indices Loading */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl border-4 border-indigo-100"
              ></div>
            ))}
          </div>

          {/* Search Bar Loading */}
          <div className="h-20 bg-gradient-to-r from-white to-indigo-50 rounded-3xl border-4 border-indigo-100"></div>

          {/* Main Content Loading */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="h-96 bg-gradient-to-br from-white to-violet-50 rounded-3xl border-4 border-indigo-100"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl border-4 border-cyan-200"></div>
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl border-4 border-emerald-200"></div>
              <div className="h-40 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl border-4 border-violet-200"></div>
            </div>
          </div>

          {/* Bottom Stats Loading */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl border-4 border-rose-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
