import NavigationBar from "@/components/feed/navigation-bar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ChatsPage() {
  // Datos de ejemplo para los chats
  const chats = [
    {
      id: 1,
      name: "Gwen Tennyson",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "¿Dónde estás? Abuelo Max te está buscando.",
      time: "12:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Kevin Levin",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Encontré una pieza del Omnitrix que te puede interesar.",
      time: "Ayer",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Abuelo Max",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "La cena está lista. Hoy preparé gusanos fritos con salsa especial.",
      time: "Ayer",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "Vilgax",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "¡Dame el Omnitrix, Ben Tennyson!",
      time: "Lun",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Azmuth",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "He actualizado el Omnitrix. Ahora tienes acceso a 10 nuevos aliens.",
      time: "Dom",
      unread: 0,
      online: true,
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
          <h1 className="text-2xl font-bold text-emerald-400">Chats</h1>
        </div>
      </header>

      {/* Chat List */}
      <div className="max-w-2xl mx-auto px-4">
        <section className="divide-y divide-emerald-600/30 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 border border-emerald-600/40 shadow-lg shadow-emerald-500/5 mb-4">
          {chats.map((chat) => (
            <Link href={`/chats/${chat.id}`} key={chat.id}>
              <div className="p-5 flex items-center space-x-4 hover:bg-emerald-500/5 transition-colors">
                <div className="relative">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                      <div className="absolute inset-0.5 rounded-full bg-gray-900">
                        <Image
                          src={chat.avatar || "/placeholder.svg"}
                          alt={chat.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-gray-900"></div>
                  )}

                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center px-1.5">
                      <span className="text-xs text-white font-medium">{chat.unread}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-base text-white">{chat.name}</span>
                    <span className="text-sm text-gray-400">{chat.time}</span>
                  </div>
                  <p className={`text-base ${chat.unread > 0 ? "text-white font-medium" : "text-gray-400"} truncate`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </main>
  )
}
