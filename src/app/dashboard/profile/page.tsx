
import Image from "next/image"
import { Bookmark, Grid, Heart, MessageCircle, Users, UserPlus, UserCheck } from "lucide-react"
import { cookies } from "next/headers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UltimatrixProfileSection from "@/components/profile/ultimatrix-profile-section"
import OmnitrixStorySelector from "@/components/profile/omnitrix-story-selector"
import PostFeed from "@/components/profile/post-feed"
import FollowersList from "@/components/profile/followers-list"
import FollowingList from "@/components/profile/following-list"



export default async function ProfilePage() {
  // Obtener el userId de las cookies
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value
  const username = cookieStore.get('username')?.value

  if (!userId) {
    // Manejar el caso donde no hay userId en las cookies
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-black">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Usuario no autenticado</h2>
          <p>Por favor inicia sesión para ver tu perfil</p>
        </div>
      </div>
    )
  }

  if (!username) {
    // Manejar el caso donde no hay userId en las cookies
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-black">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Usuario no autenticado</h2>
          <p>Por favor inicia sesión para ver tu perfil</p>
        </div>
      </div>
    )
  }




  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/alien-pattern.svg')] bg-repeat opacity-20"></div>
      </div>

      {/* Ultimatrix Profile Section - Now a full width component */}
      <UltimatrixProfileSection userId={userId } username={username} />

      {/* Omnitrix Story Selector */}
      <div className="px-4 py-6 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-green-400 font-bold mb-4">historias destacadas</h2>
          <OmnitrixStorySelector />
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4 py-6 bg-black/60">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid grid-cols-6 bg-black/40 mb-6">
              <TabsTrigger
                value="feed"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Publicaciones</span>
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <Grid className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Galería</span>
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <Bookmark className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Guardados</span>
              </TabsTrigger>
              <TabsTrigger
                value="tagged"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <Users className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Etiquetados</span>
              </TabsTrigger>
              <TabsTrigger
                value="followers"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Seguidores</span>
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                <UserCheck className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Seguidos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-0">
              <PostFeed />
            </TabsContent>

            <TabsContent value="posts" className="mt-0">
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="aspect-square relative group">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Foto${item}`}
                      alt={`Post ${item}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 mr-1" />
                        <span>24k</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-1" />
                        <span>482</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="text-center py-12 text-gray-400">
                <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay publicaciones guardadas</p>
              </div>
            </TabsContent>

            <TabsContent value="tagged">
              <div className="text-center py-12 text-gray-400">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay publicaciones etiquetadas</p>
              </div>
            </TabsContent>

            {/* Followers Tab Content */}
            <TabsContent value="followers" className="mt-0">
              <FollowersList  userId={userId }  />
            </TabsContent>

            {/* Following Tab Content */}
            <TabsContent value="following" className="mt-0">
              <FollowingList  userId={userId } />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
