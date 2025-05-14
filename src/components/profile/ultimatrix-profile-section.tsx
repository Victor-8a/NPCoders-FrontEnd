'use client'

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Bookmark,
  ChevronRight,
  Clock,
  Heart,
  LogOut,
  MessageCircle,
  Settings,
  Shield,
  User,
  Zap,
  Layers,
  Database,
  Hexagon,
  Badge,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"


interface Counts {
  followersCount: number
  followingCount: number
}

interface Transformation {
  name: string
  type: string
  uses: number
  image: string
}

export default function UltimatrixProfileSection({ userId, username }: { userId: string, username: string }) {
  const [scanLine, setScanLine] = useState(0)
  const [profileData, setProfileData] = useState({
    name: username,
    username: username.toLowerCase(),
    bio: "Portador del Omnitrix. Héroe a tiempo parcial. Salvando el universo desde los 10 años. #EsHoraDeSerHéroe #Omnitrix",
    level: "Héroe Galáctico",
    powerLevel: 7500,
    species: "Humano/Portador del Omnitrix",
  })
  const [counts, setCounts] = useState<Counts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Datos de ejemplo para las transformaciones
  const transformations: Transformation[] = [
    { name: "Fuego Pantanoso", type: "Elemental", uses: 42, image: "/placeholder.svg?height=80&width=80&text=FP" },
    { name: "Eco Eco", type: "Sónico", uses: 38, image: "/placeholder.svg?height=80&width=80&text=EE" },
    { name: "Humungosaurio", type: "Fuerza", uses: 56, image: "/placeholder.svg?height=80&width=80&text=H" },
    { name: "Frío", type: "Criogénico", uses: 27, image: "/placeholder.svg?height=80&width=80&text=F" },
    { name: "Cerebron", type: "Psíquico", uses: 19, image: "/placeholder.svg?height=80&width=80&text=C" },
    { name: "Jetray", type: "Velocidad", uses: 31, image: "/placeholder.svg?height=80&width=80&text=J" },
  ]

  // Efecto para la animación de la línea de escaneo del holograma
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`/api/profile/followersCount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Error al obtener los conteos')
        }
        
        const data = await response.json()
        setCounts(data.counts)
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMessage)
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [userId])

  return (
    <div className="relative w-full h-full">
      {/* Fondo del Ultimatrix con efectos mejorados */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300/20 via-black to-black"></div>

      {/* Patrón de circuito */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGgtOHYyNGg4eiIgc3Ryb2tlPSIjMDgzMzA4IiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzAgMTh2MjQiIHN0cm9rZT0iIzA4MzMwOCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTM2IDMwaC0xMk0zNiAyNGgtMTJNMzYgMzZoLTEyIiBzdHJva2U9IiMwODMzMDgiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

      {/* Líneas de energía animadas */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-green-500 via-transparent to-green-500"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-green-500 via-transparent to-green-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      </motion.div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Botón de configuración estilo Omnitrix */}
        <div className="absolute top-4 right-4 md:right-0 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-black border-2 border-green-500 hover:bg-green-900/20 hover:border-green-400 shadow-[0_0_10px_rgba(0,255,0,0.3)]"
              >
                <Settings className="h-6 w-6 text-green-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-black border-2 border-green-500 text-green-400 shadow-[0_0_15px_rgba(0,255,0,0.2)]"
              align="end"
            >
              <DropdownMenuLabel className="text-white font-bold">PANEL DE CONTROL</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-green-500/30" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Tus historias</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Tu actividad</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Guardados</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificaciones</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Mensajes</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-green-500/30" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Editar perfil</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/30 focus:bg-green-900/30 cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Privacidad</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-green-500/30" />
              <DropdownMenuItem className="hover:bg-red-900/30 focus:bg-red-900/30 text-red-400 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sección de perfil principal */}
        <div className="bg-black/80 border border-green-900/50 rounded-xl p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,50,0,0.15)]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Contenedor del holograma mejorado */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* Base del proyector holográfico */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-gray-900 rounded-md border-2 border-green-800 z-10">
                {/* Detalles del proyector */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-2 bg-green-500/70 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-[20%] transform -translate-y-1/2 w-2 h-2 rounded-full bg-green-500/90 animate-pulse"></div>
                <div className="absolute top-1/2 right-[20%] transform -translate-y-1/2 w-2 h-2 rounded-full bg-green-500/90 animate-pulse"></div>
              </div>

              {/* Efecto de luz del proyector */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-green-500/30 filter blur-md rounded-full"></div>

              {/* Contenedor del holograma */}
              <motion.div
                className="absolute bottom-10 w-full h-full rounded-full overflow-hidden"
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                {/* Efecto de holograma */}
                <div className="absolute inset-0 bg-green-500/10 z-10"></div>

                {/* Líneas de escaneo */}
                <motion.div
                  className="absolute w-full h-1 bg-green-400/40 z-20 blur-[1px]"
                  style={{ top: `${scanLine}%` }}
                ></motion.div>

                {/* Efecto de interferencia */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-20 mix-blend-screen z-20"></div>

                {/* Imagen de perfil con efecto holográfico */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200&text=Tu+Foto"
                    alt="Tu foto de perfil"
                    width={200}
                    height={200}
                    className="object-cover mix-blend-screen opacity-90 filter brightness-125 contrast-125"
                  />
                </div>
              </motion.div>

              {/* Símbolo del Ultimatrix mejorado */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-black rounded-md border-2 border-green-800 flex items-center justify-center z-20 shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                <motion.div
                  className="w-10 h-10 bg-green-500 rounded-sm flex items-center justify-center"
                  animate={{
                    boxShadow: ["0 0 5px #00ff00", "0 0 15px #00ff00", "0 0 5px #00ff00"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-8 h-2 bg-black"></div>
                  <div className="absolute w-2 h-8 bg-black"></div>
                </motion.div>
              </div>
            </div>

            {/* Información del perfil mejorada */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h1 className="text-3xl font-bold text-white mb-1">{profileData.name}</h1>
                <Badge className="self-center md:self-auto bg-green-900 text-green-300 border border-green-500 px-3 py-1 text-xs">
                  {profileData.level}
                </Badge>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <p className="text-green-400">@{profileData.username}</p>
                <Badge className="border-green-700 text-green-400 text-xs">
                  <Zap className="w-3 h-3 mr-1" /> {profileData.powerLevel}
                </Badge>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <p className="font-bold text-white text-xl">42</p>
                  <p className="text-xs text-gray-300">Publicaciones</p>
                </div>
                <div className="text-center cursor-pointer hover:text-green-400 transition-colors">
                  <p className="font-bold text-white text-xl">
                    {loading ? "..." : error ? "Error" : (counts?.followersCount ?? 0)}
                  </p>
                  <p className="text-xs text-gray-300">Seguidores</p>
                </div>
                <div className="text-center cursor-pointer hover:text-green-400 transition-colors">
                  <p className="font-bold text-white text-xl">
                    {loading ? "..." : error ? "Error" : (counts?.followingCount ?? 0)}
                  </p>
                  <p className="text-xs text-gray-300">Siguiendo</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white text-xl">10</p>
                  <p className="text-xs text-gray-300">Planetas</p>
                </div>
              </div>


              <p className="text-white mb-6 max-w-md">{profileData.bio}</p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600 text-black font-medium shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                      Editar Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-2 border-green-500 text-white shadow-[0_0_30px_rgba(0,255,0,0.2)]">
                    <DialogHeader>
                      <DialogTitle className="text-green-400 text-xl">Editar Perfil</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Actualiza la información de tu perfil.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-white">
                          Nombre
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="username" className="text-white">
                          Nombre de usuario
                        </Label>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-1">@</span>
                          <Input
                            id="username"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio" className="text-white">
                          Biografía
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          className="bg-gray-900 border-gray-700 text-white min-h-[100px] focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="picture" className="text-white">
                          Foto de perfil
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                            <Image
                              src="/placeholder.svg?height=100&width=100&text=Tu+Foto"
                              alt="Tu foto de perfil"
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-900/20">
                            Cambiar foto
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-900">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button className="bg-green-500 hover:bg-green-600 text-black">Guardar cambios</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-900/20">
                  Compartir Perfil
                </Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-900/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}