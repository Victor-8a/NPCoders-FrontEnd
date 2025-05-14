"use client"

import { Home, Search, Bell, MessageSquare, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NavigationBar() {
  const router = useRouter()

  const navItems = [
    { icon: Home, label: "Inicio", href: "/dashboard/menu" },
    { icon: Search, label: "Explorar", href: "/explore" },
    { icon: Bell, label: "Notificaciones", href: "/notifications" },
    { icon: MessageSquare, label: "Chats", href: "/chats" },
    { icon: User, label: "Perfil", href: "/dashboard/profile" }, // Sin redirección como solicitado
  ]

  const handleNavigation = (href: string, label: string) => {

    router.push(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-green-600/50 py-2">
      <div className="max-w-2xl mx-auto flex justify-around items-center">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isProfile = item.label === "Perfil"

          return (
            <button
              key={index}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors",
              )}
              onClick={() => handleNavigation(item.href, item.label)}

            >
              <Icon className="w-7 h-7 text-green-500" />
              <span className="text-sm mt-1 text-gray-300">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
