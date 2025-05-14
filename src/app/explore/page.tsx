import NavigationBar from "@/components/feed/navigation-bar"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ExplorePage() {
  // Datos de ejemplo para tendencias
  const trends = [
    { id: 1, tag: "#Upgrade", posts: "12.5K" },
    { id: 2, tag: "#AlienX", posts: "8.3K" },
    { id: 3, tag: "#PlomeroGaláctico", posts: "6.7K" },
    { id: 4, tag: "#VilgaxAtaca", posts: "5.2K" },
    { id: 5, tag: "#NuevosAliens", posts: "4.9K" },
  ]

  // Datos de ejemplo para sugerencias
  const suggestions = [
    {
      id: 1,
      name: "Tetrax",
      username: "tetrax_shard",
      avatar: "/placeholder.svg?height=50&width=50",
      bio: "Cazarrecompensas Petrosapien. Protector del Omnitrix.",
    },
    {
      id: 2,
      name: "Myaxx",
      username: "myaxx_tech",
      avatar: "/placeholder.svg?height=50&width=50",
      bio: "Asistente de Azmuth. Experta en tecnología Galvan.",
    },
    {
      id: 3,
      name: "Rook Blonko",
      username: "rook_plomero",
      avatar: "/placeholder.svg?height=50&width=50",
      bio: "Plomero. Compañero de Ben Tennyson. Experto en Proto-Herramienta.",
    },
  ]

  return (
    <main className="min-h-screen text-white pb-16 bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-emerald-500/70 p-4 shadow-lg shadow-emerald-500/10">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
          </Link>
          <h1 className="text-2xl font-bold text-emerald-400">Explorar</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        {/* Search Bar */}
        <div className="p-4 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 border border-emerald-600/40 shadow-lg shadow-emerald-500/5">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en OmniTweet"
              className="w-full bg-gray-800/60 border border-emerald-500/40 rounded-full py-2.5 pl-10 pr-4 text-base text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Trends */}
        <section className="mt-4 border border-emerald-600/40 bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg shadow-emerald-500/5">
          <h2 className="p-4 text-xl font-bold text-emerald-300">Tendencias</h2>
          <div className="divide-y divide-emerald-600/30">
            {trends.map((trend) => (
              <div key={trend.id} className="p-4 hover:bg-emerald-500/5 transition-colors cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-bold text-base text-emerald-400">{trend.tag}</span>
                  <span className="text-sm text-gray-400">{trend.posts} posts</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Suggestions */}
        <section className="mt-4 border border-emerald-600/40 bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg shadow-emerald-500/5 mb-4">
          <h2 className="p-4 text-xl font-bold text-emerald-300">A quién seguir</h2>
          <div className="divide-y divide-emerald-600/30">
            {suggestions.map((user) => (
              <div key={user.id} className="p-5 flex items-center space-x-4 hover:bg-emerald-500/5 transition-colors">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                    <div className="absolute inset-0.5 rounded-full bg-gray-900">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-bold text-base text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">@{user.username}</div>
                    </div>
                    <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                      Seguir
                    </button>
                  </div>
                  <p className="text-base text-gray-300 mt-1 line-clamp-2">{user.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </main>
  )
}
