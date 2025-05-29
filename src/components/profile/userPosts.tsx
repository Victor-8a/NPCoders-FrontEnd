"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import {
  Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Post = {
  id: string
  content: string
  imagenes: string[]
  createdAt: string
  autor: {
    username: string
    profilePic: string
  }
  hashtags: string[]
  reacciones: any[]
  comentarios: any[]
}

export default function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserPosts = async () => {
    try {
      const res = await fetch("/api/auth/userPosts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!res.ok) throw new Error("Error al obtener tus publicaciones")
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error(err)
      setError("No se pudieron cargar tus publicaciones.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: es })
  }

  if (loading) return <div className="text-center p-4">Cargando tus publicaciones...</div>
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>

  return (
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="bg-black/60 border border-green-500/30 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 border-2 border-green-500">
                <AvatarImage src={post.autor.profilePic || "/placeholder.svg"} alt={post.autor.username} />
                <AvatarFallback>{post.autor.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-white">{post.autor.username}</div>
                <div className="text-gray-400 text-sm">{formatTimestamp(post.createdAt)}</div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-green-500/20 rounded-full">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black border border-green-500/30 text-white">
                <DropdownMenuItem className="hover:bg-green-500/20 cursor-pointer">
                  <Bookmark className="w-4 h-4 mr-2" /> Guardar post
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-green-500/20" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer">
                  Reportar post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-white whitespace-pre-wrap mb-3">{post.content}</p>

          {post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="text-green-300 text-sm">
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}

          {post.imagenes.length > 0 && (
            <div className={`grid gap-2 rounded-lg overflow-hidden ${post.imagenes.length === 1 ? "" : "grid-cols-2"}`}>
              {post.imagenes.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <Image src={img} alt={`Post image ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between text-gray-400 border-t border-green-500/20 pt-3">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-green-400 hover:bg-green-500/10">
              <Heart className="w-4 h-4" />
              <span>{post.reacciones.length || ""}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-blue-400 hover:bg-blue-500/10">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comentarios.length || ""}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-purple-400 hover:bg-purple-500/10">
              <Repeat2 className="w-4 h-4" />
              <span>0</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-cyan-400 hover:bg-cyan-500/10">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
