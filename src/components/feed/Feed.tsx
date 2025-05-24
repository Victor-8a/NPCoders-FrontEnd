"use client"

import { useEffect, useState } from "react"

type Post = {
  id: string
  content: string
  imageUrl?: string
  createdAt: string
  author: {
    name: string
    avatar: string
  }
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/auth/postFeed")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) return <div className="p-4 text-center">Cargando...</div>

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 border border-green-500/20 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full border border-green-500"
            />
            <div>
              <h4 className="font-bold text-green-400">{post.author.name}</h4>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mb-3">{post.content}</p>
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="w-full max-h-96 object-contain rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  )
}