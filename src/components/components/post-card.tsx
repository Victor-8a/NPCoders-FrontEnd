import { Heart, MessageCircle, Share2 } from "lucide-react"

interface Post {
  id: number
  user: string
  username: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  time: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="p-6 hover:bg-green-900/10 transition-colors">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-green-500 overflow-hidden relative">
            <img src={post.avatar || "/placeholder.svg"} alt={post.user} className="w-full h-full object-cover" />
            {/* Líneas de circuito estilo Upgrade */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-2 bg-cyan-400"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-2 bg-cyan-400"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base">{post.user}</span>
            <span className="text-gray-500 text-sm">@{post.username}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{post.time}</span>
          </div>

          <p className="mt-2 mb-3 text-base leading-relaxed">{post.content}</p>

          {post.image && (
            <div className="mt-2 mb-3 rounded-xl overflow-hidden border border-green-500/30 relative">
              <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
              {/* Líneas de circuito en las esquinas */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60"></div>
            </div>
          )}

          <div className="flex justify-between mt-3 text-gray-500">
            <button className="flex items-center space-x-2 group">
              <Heart className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-base group-hover:text-green-500 transition-colors">{post.likes}</span>
            </button>

            <button className="flex items-center space-x-2 group">
              <MessageCircle className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-base group-hover:text-green-500 transition-colors">{post.comments}</span>
            </button>

            <button className="flex items-center space-x-2 group">
              <Share2 className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-base group-hover:text-green-500 transition-colors">{post.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
