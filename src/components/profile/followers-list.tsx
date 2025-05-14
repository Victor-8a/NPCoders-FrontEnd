"use client"
import Image from "next/image"
import Link from "next/link" // Importamos Link
import { UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface Follower {
  id: string
  name: string
  username: string
  avatar: string
  isFollowing: boolean
  followersCount: number
}

interface Counts {
  followersCount: number
  followingCount: number
}

export default function FollowersList({ userId }: { userId: string }) {
  const [counts, setCounts] = useState<Counts | null>(null)
  const [followers, setFollowers] = useState<Follower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  const generateAvatarUrl = (name: string) => {
    const cleanName = name?.trim() || 'Usuario'
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=random`
  }

  const getAvatarUrl = (user: Follower) => {
    if (!user.avatar || user.avatar === 'default.jpg') {
      return generateAvatarUrl(user.name)
    }

    if (user.avatar.startsWith('http://') || user.avatar.startsWith('https://')) {
      return user.avatar
    }

    return `/${user.avatar.replace(/^\//, '')}`
  }

  useEffect(() => {
    setIsClient(true)
    const fetchData = async () => {
      try {
        const countsResponse = await fetch(`/api/profile/followersCount`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!countsResponse.ok) throw new Error('Error al obtener conteos');
        const countsData = await countsResponse.json();
        setCounts(countsData.counts);

        const followersResponse = await fetch(`/api/users/follower`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!followersResponse.ok) throw new Error('Error al obtener seguidores');
        const followersData = await followersResponse.json();
        setFollowers(followersData.followers || []);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId])

  const handleRemoveFollower = async (followerId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Detenemos la propagación para que no active el Link
    e.preventDefault(); // Prevenimos el comportamiento por defecto
    
    try {
      setFollowers(prev => prev.filter(follower => follower.id !== followerId));
      setCounts(prev => prev ? {
        ...prev,
        followersCount: Math.max(0, prev.followersCount - 1)
      } : null);
  
      const response = await fetch('/api/users/deleteFollower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, followerId }),
      });
  
      if (!response.ok) throw new Error('Error al eliminar seguidor');
  
      toast({
        title: "Seguidor eliminado",
        description: "Has eliminado a este usuario de tus seguidores"
      });
  
    } catch (err) {
      console.error(err);
      const fetchData = async () => {
        const [countsRes, followersRes] = await Promise.all([
          fetch(`/api/profile/followersCount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          }),
          fetch(`/api/users/follower`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          })
        ]);
  
        if (countsRes.ok) setCounts(await countsRes.json());
        if (followersRes.ok) setFollowers(await followersRes.json());
      };
  
      fetchData();
  
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Error al eliminar seguidor"
      });
    }
  }

  if (!isClient) return (
    <div className="bg-black/30 rounded-lg p-4 text-center text-gray-400">
      Cargando...
    </div>
  );

  if (loading) return (
    <div className="bg-black/30 rounded-lg p-4 text-center text-gray-400">
      Cargando seguidores...
    </div>
  )

  if (error) return (
    <div className="bg-black/30 rounded-lg p-4 text-red-400">
      {error}
    </div>
  )

  return (
    <div className="bg-black/30 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-green-400 font-bold text-xl">Seguidores</h3>
        <div className="text-white text-sm">{counts?.followersCount} seguidores</div>
      </div>

      {followers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {followers.map((follower) => (
            <Link 
              key={follower.id}
              href={`/profile/${follower.username}`}
              passHref
              className="block"
            >
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-green-900/30 hover:border-green-500/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/50">
                    <Image
                      src={getAvatarUrl(follower)}
                      alt={follower.name || 'Usuario'}
                      width={48}
                      height={48}
                      className="object-cover"
                      priority={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = generateAvatarUrl(follower.name);
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{follower.name}</div>
                    <div className="text-gray-400 text-sm">
                      @{follower.username} • {follower.followersCount} seguidores
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleRemoveFollower(follower.id, e)}
                  className="border-red-500/50 text-red-400 hover:bg-red-900/20"
                >
                  <X className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Eliminar</span>
                </Button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No tienes seguidores todavía
        </div>
      )}
    </div>
  )
}