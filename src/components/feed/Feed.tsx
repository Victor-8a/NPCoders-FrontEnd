"use client"

import { useEffect, useState } from "react"

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

export default function Feed() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/auth/postFeed")
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Posts recibidos:", data) // Para depuración
      

      
      setPosts(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError("No se pudieron cargar los posts. Intenta recargar la página.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) return <div className="p-4 text-center">Cargando...</div>
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>
  if (posts.length === 0) return <div className="p-4 text-center">No hay posts disponibles</div>

  return (
    <div className="space-y-4 p-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 border border-green-500/20 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={post.autor.profilePic || '/default-profile.jpg'} 
              alt={post.autor.username}
              className="w-10 h-10 rounded-full border border-green-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-profile.jpg'
              }}
            />
            <div>
              <h4 className="font-bold text-green-400">{post.autor.username}</h4>
              <p className="text-xs text-gray-400">
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Fecha desconocida'}
              </p>
            </div>
          </div>
          <p className="mb-3 whitespace-pre-wrap">{post.content}</p>
          
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="text-green-300 text-sm">
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
          
          {post.imagenes && post.imagenes.length > 0 && (
            <div className="space-y-2">
              {post.imagenes.map((imageUrl, index) => (
                <img 
                  key={index}
                  src={imageUrl} 
                  alt="Post content" 
                  className="w-full max-h-96 object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="flex gap-4 mt-3 text-sm text-gray-400">
            <span>{post.reacciones?.length || 0} reacciones</span>
            <span>{post.comentarios?.length || 0} comentarios</span>
          </div>
        </div>
      ))}
    </div>
  )
}