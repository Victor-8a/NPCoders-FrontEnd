"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PostCreation from "./post-creation"

// Tipo para los posts
type Post = {
  id: number
  text: string
  images: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  user: {
    name: string
    username: string
    avatar: string
  }
}

// Posts iniciales de ejemplo
const initialPosts: Post[] = [
  {
    id: 1,
    text: "¡Acabo de conseguir el nuevo Omnitrix Ultimate! La capacidad de transformación es increíble 🔥 #Ben10 #Omnitrix",
    images: ["/placeholder.svg?height=400&width=400&text=Nuevo+Omnitrix"],
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
    likes: 1243,
    comments: 89,
    shares: 56,
    user: {
      name: "Tu Nombre",
      username: "tu_usuario",
      avatar: "/placeholder.svg?height=100&width=100&text=Tu+Foto",
    },
  },
  {
    id: 2,
    text: "Hoy me encontré con este increíble cosplay de Fuego Pantanoso. ¡El nivel de detalle es impresionante! ¿Cuál es tu alien favorito? 👽",
    images: [
      "/placeholder.svg?height=400&width=400&text=Cosplay+1",
      "/placeholder.svg?height=400&width=400&text=Cosplay+2",
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 horas atrás
    likes: 842,
    comments: 124,
    shares: 37,
    user: {
      name: "Tu Nombre",
      username: "tu_usuario",
      avatar: "/placeholder.svg?height=100&width=100&text=Tu+Foto",
    },
  },
  {
    id: 3,
    text: "Maratón de Ben 10: Fuerza Alienígena este fin de semana. ¡Preparen las palomitas! 🍿🛸",
    images: [],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 día atrás
    likes: 567,
    comments: 42,
    shares: 15,
    user: {
      name: "Tu Nombre",
      username: "tu_usuario",
      avatar: "/placeholder.svg?height=100&width=100&text=Tu+Foto",
    },
  },
]

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  // Función para formatear el timestamp
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: es })
  }

  // Función para añadir un nuevo post
  const handleNewPost = (post: Post) => {
    setPosts([post, ...posts])
  }

  // Función para manejar likes
  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      }),
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PostCreation onPostCreated={handleNewPost} />

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-black/60 border border-green-500/30 rounded-lg p-4">
            {/* Cabecera del post */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 border-2 border-green-500">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">{post.user.name}</span>
                    <span className="text-gray-400">@{post.user.username}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{formatTimestamp(post.timestamp)}</div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-400 hover:bg-green-500/20 hover:text-white"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black border border-green-500/30 text-white">
                  <DropdownMenuItem className="hover:bg-green-500/20 cursor-pointer">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Guardar post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-green-500/20" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer">
                    Reportar post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contenido del post */}
            <div className="mb-3">
              <p className="text-white whitespace-pre-wrap mb-3">{post.text}</p>

              {/* Imágenes */}
              {post.images.length > 0 && (
                <div
                  className={`grid gap-2 rounded-lg overflow-hidden ${post.images.length === 1 ? "" : "grid-cols-2"}`}
                >
                  {post.images.map((img, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Acciones del post */}
            <div className="flex justify-between text-gray-400 border-t border-green-500/20 pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:text-green-400 hover:bg-green-500/10"
                onClick={() => handleLike(post.id)}
              >
                <Heart className="w-4 h-4" />
                <span>{post.likes > 0 ? post.likes : ""}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:text-blue-400 hover:bg-blue-500/10"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments > 0 ? post.comments : ""}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:text-purple-400 hover:bg-purple-500/10"
              >
                <Repeat2 className="w-4 h-4" />
                <span>{post.shares > 0 ? post.shares : ""}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:text-cyan-400 hover:bg-cyan-500/10"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
