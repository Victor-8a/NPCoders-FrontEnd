import CreatePostForm from "@/components/components/create-post-form"
import OmnitrixStories from "@/components/components/omnitrix-stories"
import PostCard from "@/components/components/post-card"
import NavigationBar from "@/components/feed/navigation-bar"


export default function Home() {
  // Sample data - would come from your database in a real app
  const stories = [
    { id: 1, username: "ben10", avatar: "/placeholder.svg?height=40&width=40", name: "Ben Tennyson", active: true },
    { id: 2, username: "gwen", avatar: "/placeholder.svg?height=40&width=40", name: "Gwen Tennyson", active: false },
    { id: 3, username: "kevin", avatar: "/placeholder.svg?height=40&width=40", name: "Kevin Levin", active: true },
    { id: 4, username: "max", avatar: "/placeholder.svg?height=40&width=40", name: "Max Tennyson", active: false },
  ]

  const posts = [
    {
      id: 1,
      username: "ben10",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Just transformed into Heatblast! 🔥",
      image: "/placeholder.svg?height=400&width=500",
      likes: 42,
      comments: 10,
      time: "2h",
      user: "Ben Tennyson",
      shares: 5,
    },
    {
      id: 2,
      username: "gwen",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Magic practice going well today ✨",
      image: "/placeholder.svg?height=400&width=500",
      likes: 38,
      comments: 5,
      time: "4h",
      user: "Gwen Tennyson",
      shares: 3,
    },
  ]

  return (
    <main className="min-h-screen text-white pb-16 bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-emerald-500/70 p-4 shadow-lg shadow-emerald-500/10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-emerald-400 flex items-center">
            <span className="mr-2">OmniTweet</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </h1>
        </div>
      </header>

      {/* Contenedor principal con ancho máximo */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Omnitrix Stories */}
        <section className="py-5 border border-emerald-600/40 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 shadow-lg shadow-emerald-500/5">
          <OmnitrixStories stories={stories} />
        </section>

        {/* Create Post Form */}
        <section className="border border-emerald-600/40 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 shadow-lg shadow-emerald-500/5">
          <CreatePostForm />
        </section>

        {/* Feed */}
        <section className="divide-y divide-emerald-600/30 bg-gray-900/80 backdrop-blur-md rounded-lg mt-4 shadow-lg shadow-emerald-500/5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </main>
  )
}
