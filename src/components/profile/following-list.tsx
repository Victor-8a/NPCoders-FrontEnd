"use client"
import Image from "next/image"
import { UserCheck, UserPlus, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  isFollowing: boolean
  followersCount: number
}

interface Counts {
  followingCount: number
}

export default function FollowingList({ userId }: { userId: string }) {
  const [counts, setCounts] = useState<Counts | null>(null)
  const [following, setFollowing] = useState<User[]>([])
  const [suggestions, setSuggestions] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    fetchData()
  }, [userId])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Obtener conteos
      const countsResponse = await fetch(`/api/profile/followersCount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (!countsResponse.ok) throw new Error('Error al obtener conteos')
      const countsData = await countsResponse.json()
      setCounts(countsData.counts)

      // Obtener lista de seguidos
      const followingResponse = await fetch(`/api/users/following`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (!followingResponse.ok) throw new Error('Error al obtener seguidos')
      const followingData = await followingResponse.json()
      setFollowing(followingData.following)

      // Obtener sugerencias
      const suggestionsResponse = await fetch(`/api/users/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (!suggestionsResponse.ok) throw new Error('Error en sugerencias')
      const suggestionsData = await suggestionsResponse.json()

      // Filtrar sugerencias para excluir usuarios que ya sigues
      const filteredSuggestions = suggestionsData.filter(
        (suggestion: User) => !followingData.following.some(
          (followedUser: User) => followedUser.id === suggestion.id
        )
      )
      setSuggestions(filteredSuggestions)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      toast({ variant: 'destructive', title: 'Error', description: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleFollowToggle = async (IdUser: string, targetUserId: string, isCurrentlyFollowing: boolean) => {
    try {
      const endpoint = isCurrentlyFollowing ? '/api/users/unfollow' : '/api/users/follow'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IdUser, targetUserId }),
      })

      if (!response.ok) {
        throw new Error(`Error al ${isCurrentlyFollowing ? 'dejar de seguir' : 'seguir'} usuario`)
      }

      // Actualizar el estado local sin necesidad de recargar
      if (isCurrentlyFollowing) {
        // Dejar de seguir: remover de la lista de seguidos y agregar a sugerencias si corresponde
        setFollowing(prev => prev.filter(user => user.id !== targetUserId))
        
        // Actualizar el contador
        setCounts(prev => prev ? { ...prev, followingCount: prev.followingCount - 1 } : null)
        
        // Agregar a sugerencias si no está ya allí
        const unfollowedUser = following.find(user => user.id === targetUserId)
        if (unfollowedUser) {
          setSuggestions(prev => [...prev, { ...unfollowedUser, isFollowing: false }])
        }
      } else {
        // Seguir: agregar a la lista de seguidos y remover de sugerencias
        const followedUser = suggestions.find(user => user.id === targetUserId) || 
          { id: targetUserId, name: '', username: '', avatar: '', isFollowing: true, followersCount: 0 }
        
        setFollowing(prev => [...prev, { ...followedUser, isFollowing: true }])
        
        // Actualizar el contador
        setCounts(prev => prev ? { ...prev, followingCount: prev.followingCount + 1 } : null)
        
        // Remover de sugerencias
        setSuggestions(prev => prev.filter(user => user.id !== targetUserId))
      }

      toast({
        title: isCurrentlyFollowing
          ? "Has dejado de seguir a este usuario"
          : "¡Ahora estás siguiendo a este usuario!"
      })

    } catch (err) {
      console.error(err)
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      toast({ variant: "destructive", title: "Error", description: errorMessage })
    }
  }

  const getAvatarUrl = (user: User) => {
    if (!user.avatar || user.avatar === 'default.jpg') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=random`
    }
    
    if (user.avatar.startsWith('http://') || user.avatar.startsWith('https://')) {
      return user.avatar
    }
    
    return `/${user.avatar.replace(/^\//, '')}`
  }

  if (!isClient) return null

  if (loading) return (
    <div className="bg-black/30 rounded-lg p-4 text-center text-gray-400">
      Cargando...
    </div>
  )

  if (error) return (
    <div className="bg-black/30 rounded-lg p-4 text-red-400">
      {error}
    </div>
  )

  return (
    <div className="bg-black/30 rounded-lg p-4 space-y-6">
      {/* Sección de usuarios seguidos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-green-400 font-bold text-xl">Seguidos</h3>
          <div className="text-white text-sm">Siguiendo a {counts?.followingCount}</div>
        </div>

        {following.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {following.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-green-900/30 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/50">
                    <Image
                      src={getAvatarUrl(user)}
                      alt={user.name || 'Usuario'}
                      width={48}
                      height={48}
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">
                      @{user.username} • {user.followersCount} seguidores
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFollowToggle(userId, user.id, true)}
                  className="border-red-500/50 text-red-400 hover:bg-red-900/20"
                >
                  <UserX className="h-4 w-4 mr-1" /> Dejar de seguir
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">
            Aún no sigues a ningún usuario
          </div>
        )}
      </div>

      {/* Sección de sugerencias (siempre visible si hay sugerencias) */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-green-400 font-bold text-xl mb-4">Sugerencias para seguir</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-green-900/30 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/50">
                    <Image
                      src={getAvatarUrl(user)}
                      alt={user.name || 'Usuario'}
                      width={48}
                      height={48}
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">
                      @{user.username} • {user.followersCount} seguidores
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFollowToggle(userId, user.id, false)}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20"
                >
                  <UserPlus className="h-4 w-4 mr-1" /> Seguir
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}