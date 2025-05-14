import OmnitrixStories from "@/components/feed/omnitrix-stories"
import PostCard from "@/components/feed/post-card"
import NavigationBar from "@/components/feed/navigation-bar"
import CreatePostForm from "@/components/feed/create-post-form"

export default function Home() {
  // Datos de ejemplo para las historias
  const stories = [
    { id: 1, name: "Cuatrobrazos", avatar: "/placeholder.svg?height=50&width=50", active: true },
    { id: 2, name: "Diamante", avatar: "/placeholder.svg?height=50&width=50", active: true },
    { id: 3, name: "XLR8", avatar: "/placeholder.svg?height=50&width=50", active: false },
    { id: 4, name: "Fuego", avatar: "/placeholder.svg?height=50&width=50", active: true },
    { id: 5, name: "Cannonbolt", avatar: "/placeholder.svg?height=50&width=50", active: false },
    { id: 6, name: "Materia Gris", avatar: "/placeholder.svg?height=50&width=50", active: true },
  ]

  // Datos de ejemplo para los posts
  const posts = [
    {
      id: 1,
      user: "Ben Tennyson",
      username: "ben10",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "¡Acabo de transformarme en un nuevo alien! ¡Es hora de ser héroe! 🦸‍♂️",
      image: "/placeholder.svg?height=300&width=500",
      likes: 1024,
      comments: 89,
      shares: 45,
      time: "2h",
    },
    {
      id: 2,
      user: "Gwen Tennyson",
      username: "gwen_magic",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "Mi primo Ben siempre metiéndose en problemas. Tendré que salvarlo de nuevo... 🙄✨",
      likes: 782,
      comments: 56,
      shares: 12,
      time: "4h",
    },
    {
      id: 3,
      user: "Kevin Levin",
      username: "kevin11",
      avatar: "/placeholder.svg?height=50&width=50",
      content: "Nuevas mejoras para mi auto. Ahora puedo absorber cualquier material y aumentar su potencia. 🔧🚗",
      image: "/placeholder.svg?height=300&width=500",
      likes: 593,
      comments: 34,
      shares: 8,
      time: "6h",
    },
  ]

  return (
    <main className="min-h-screen text-white pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-green-600/50 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-green-500">OmniTweet</h1>
        </div>
      </header>

      {/* Contenedor principal con ancho máximo */}
      <div className="max-w-2xl mx-auto">
        {/* Omnitrix Stories */}
        <section className="py-5 border-b border-green-600/30 bg-black/60 backdrop-blur-sm rounded-lg mt-4">
          <OmnitrixStories stories={stories} />
        </section>

        {/* Create Post Form */}
        <section className="border-b border-green-600/30 bg-black/60 backdrop-blur-sm rounded-lg mt-4">
          <CreatePostForm />
        </section>

        {/* Feed */}
        <section className="divide-y divide-green-600/30 bg-black/60 backdrop-blur-sm rounded-lg mt-4">
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
