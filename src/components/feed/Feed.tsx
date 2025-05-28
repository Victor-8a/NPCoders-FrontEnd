"use client"

import { useEffect, useState } from "react"
import { ImageIcon, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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
    setLoading(true);
const response = await fetch("/api/auth/postFeed", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});


    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const sortedPosts = data.sort((a: Post, b: Post) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setPosts(sortedPosts);
    setError(null);
  } catch (err) {
    console.error("Error fetching posts:", err);
    setError(err instanceof Error ? err.message : "Error desconocido");
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorDisplay message={error} onRetry={fetchPosts} />
  if (posts.length === 0) return <EmptyFeed onRefresh={fetchPosts} />

  return (
    <div className="space-y-6 pb-20">
      {posts.map(post => (
        <PostCard key={post.id} post={post} formatDate={formatDate} />
      ))}
    </div>
  )
}

function PostCard({ post, formatDate }: { post: Post; formatDate: (date: string) => string }) {
  const [imageLoadError, setImageLoadError] = useState<boolean[]>([])

  useEffect(() => {
    setImageLoadError(post.imagenes?.map(() => false) || [])
  }, [post.imagenes])

  const handleImageError = (index: number) => {
    setImageLoadError(prev => {
      const newErrors = [...prev]
      newErrors[index] = true
      return newErrors
    })
  }

  // Función para determinar el grid de imágenes
  const getImageGridClass = () => {
    if (post.imagenes.length === 1) return 'grid-cols-1'
    if (post.imagenes.length === 2) return 'grid-cols-2'
    if (post.imagenes.length === 3) return 'grid-cols-2'
    if (post.imagenes.length === 4) return 'grid-cols-2'
    return 'grid-cols-2'
  }

  return (
    <div className="bg-gray-900/50 border border-green-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Header del post */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={post.autor.profilePic} 
              alt={post.autor.username}
              className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"

            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <h4 className="font-bold text-green-400">{post.autor.username}</h4>
            <p className="text-xs text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Contenido del post */}
      <div className="px-4 pb-3">
        <p className="mb-3 whitespace-pre-wrap text-gray-100">{post.content}</p>
        
        {/* Hashtags */}
        {post.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="text-green-300 text-sm hover:underline cursor-pointer">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Imágenes */}
      {post.imagenes?.length > 0 && !imageLoadError.every(Boolean) && (
        <div className="border-t border-b border-green-500/10">
          <div className={`grid ${getImageGridClass()} gap-px`}>
            {post.imagenes.map((imageUrl, index) => (
              !imageLoadError[index] && (
                <div key={index} className={`relative ${post.imagenes.length === 3 && index === 0 ? 'row-span-2' : 'aspect-square'} bg-gray-800`}>
                  <img 
                    src={imageUrl} 
                    alt={`Post de ${post.autor.username}`} 
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                    loading="lazy"
                  />
                  {imageLoadError[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                      <ImageIcon className="text-gray-500" size={24} />
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Footer del post */}
      <div className="p-3">
        <div className="flex justify-between text-gray-400 text-sm">
          <button className="flex items-center space-x-1 hover:text-red-500">
            <Heart size={18} />
            <span>{post.reacciones?.length || 0}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-400">
            <MessageCircle size={18} />
            <span>{post.comentarios?.length || 0}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-400">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-900/50 border border-green-500/20 rounded-xl p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ErrorDisplay({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="text-red-500">{message}</div>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}

function EmptyFeed({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <ImageIcon className="text-gray-500" size={48} />
      <h3 className="text-xl font-medium text-gray-200">No hay posts disponibles</h3>
      <p className="text-gray-400">Sé el primero en publicar algo o recarga para ver nuevos posts</p>
      <button 
        onClick={onRefresh}
        className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
      >
        Recargar
      </button>
    </div>
  )
}