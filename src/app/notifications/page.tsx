import { ArrowLeft, Heart, MessageCircle, Repeat, Star, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import NavigationBar from "@/components/feed/navigation-bar"

export default function NotificationsPage() {
  // Datos de ejemplo para notificaciones
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Gwen Tennyson",
      username: "gwen_magic",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "le dio me gusta a tu post",
      time: "2m",
      read: false,
    },
    {
      id: 2,
      type: "follow",
      user: "Azmuth",
      username: "azmuth_creator",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "comenzó a seguirte",
      time: "1h",
      read: false,
    },
    {
      id: 3,
      type: "retweet",
      user: "Kevin Levin",
      username: "kevin11",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "compartió tu post",
      time: "3h",
      read: true,
    },
    {
      id: 4,
      type: "mention",
      user: "Abuelo Max",
      username: "max_tennyson",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "te mencionó en un post",
      time: "5h",
      read: true,
    },
    {
      id: 5,
      type: "like",
      user: "Vilgax",
      username: "vilgax_conqueror",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "le dio me gusta a tu post",
      time: "1d",
      read: true,
    },
  ]

  // Función para obtener el icono según el tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-6 h-6 text-rose-500" />
      case "follow":
        return <UserPlus className="w-6 h-6 text-emerald-400" />
      case "retweet":
        return <Repeat className="w-6 h-6 text-cyan-400" />
      case "mention":
        return <MessageCircle className="w-6 h-6 text-amber-400" />
      default:
        return <Star className="w-6 h-6 text-yellow-500" />
    }
  }

  // Función para obtener el color de fondo según el tipo de notificación
  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return ""

    switch (type) {
      case "like":
        return "bg-rose-500/5"
      case "follow":
        return "bg-emerald-500/5"
      case "retweet":
        return "bg-cyan-500/5"
      case "mention":
        return "bg-amber-500/5"
      default:
        return "bg-emerald-500/5"
    }
  }

  return (
    <main className="min-h-screen text-white pb-16 bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-emerald-500/70 p-4 shadow-lg shadow-emerald-500/10">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
          </Link>
          <h1 className="text-2xl font-bold text-emerald-400">Notificaciones</h1>
        </div>
      </header>

      {/* Notifications List */}
      <div className="max-w-2xl mx-auto px-4">
        <section className="divide-y divide-emerald-600/30 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 border border-emerald-600/40 shadow-lg shadow-emerald-500/5 mb-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-5 flex space-x-4 hover:bg-emerald-500/5 transition-colors",
                getNotificationBgColor(notification.type, notification.read),
              )}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-gray-800/60 border border-gray-700">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                      <div className="absolute inset-0.5 rounded-full bg-gray-900">
                        <Image
                          src={notification.avatar || "/placeholder.svg"}
                          alt={notification.user}
                          width={56}
                          height={56}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="font-bold text-base text-white">{notification.user}</span>
                    <span className="text-sm text-gray-400">@{notification.username}</span>
                  </div>
                  <p className="text-base text-gray-300 mt-1">{notification.content}</p>
                  <span className="text-sm text-gray-500 mt-1 block">{notification.time}</span>
                </div>
              </div>

              {!notification.read && (
                <div className="flex-shrink-0 ml-auto">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </main>
  )
}
