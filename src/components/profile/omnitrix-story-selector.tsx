"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Historias destacadas
const destacadas = [
  { id: 1, name: "Vacaciones", color: "from-orange-500 to-red-600" },
  { id: 2, name: "Amigos", color: "from-teal-400 to-emerald-600" },
  { id: 3, name: "Eventos", color: "from-blue-400 to-blue-600" },
  { id: 4, name: "Familia", color: "from-red-500 to-red-700" },
  { id: 5, name: "Cosplay", color: "from-purple-400 to-purple-600" },
  { id: 6, name: "Colección", color: "from-green-400 to-lime-600" },
  { id: 7, name: "Viajes", color: "from-blue-300 to-cyan-600" },
  { id: 8, name: "Favoritos", color: "from-yellow-400 to-amber-600" },
  { id: 9, name: "Recuerdos", color: "from-indigo-300 to-purple-500" },
  { id: 10, name: "Fiestas", color: "from-pink-400 to-rose-600" },
]

export default function OmnitrixStorySelector() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [direction, setDirection] = useState(0) // -1 para izquierda, 1 para derecha
  const [isTransforming, setIsTransforming] = useState(false)
  const [selectedStory, setSelectedStory] = useState<null | (typeof destacadas)[0]>(null)
  const [showStoryDialog, setShowStoryDialog] = useState(false)
  const [showAddStoryDialog, setShowAddStoryDialog] = useState(false)

  // Función para navegar a la siguiente historia
  const goToNext = () => {
    if (isRotating) return
    setDirection(1)
    setIsRotating(true)
    setActiveIndex((prev) => (prev === destacadas.length - 1 ? 0 : prev + 1))
  }

  // Función para navegar a la historia anterior
  const goToPrev = () => {
    if (isRotating) return
    setDirection(-1)
    setIsRotating(true)
    setActiveIndex((prev) => (prev === 0 ? destacadas.length - 1 : prev - 1))
  }

  // Resetear el estado de rotación después de la animación
  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => {
        setIsRotating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isRotating])

  // Función para iniciar la transformación y luego mostrar la historia
  const startTransformation = (story: (typeof destacadas)[0]) => {
    if (isTransforming) return

    setIsTransforming(true)
    setSelectedStory(story)

    // Reproducir sonido de transformación (opcional)
    // const transformSound = new Audio('/transform-sound.mp3');
    // transformSound.play();

    // Mostrar la historia después de que termine la animación
    setTimeout(() => {
      setIsTransforming(false)
      setShowStoryDialog(true)
    }, 1500)
  }

  // Calcular las posiciones de las historias periféricas
  const getPeripheralPositions = () => {
    const positions = []
    const totalItems = destacadas.length - 1 // Excluimos la activa
    const radius = 130 // Radio del círculo

    for (let i = 0; i < destacadas.length; i++) {
      if (i === activeIndex) continue // Saltamos la historia activa

      // Calculamos el índice relativo (posición en el círculo)
      let relativeIndex
      if (i < activeIndex) {
        relativeIndex = i
      } else {
        relativeIndex = i - 1
      }

      // Calculamos el ángulo basado en la posición
      const angle = (relativeIndex / totalItems) * 2 * Math.PI

      // Calculamos las coordenadas x e y
      const x = radius * Math.cos(angle - Math.PI / 2) // -Math.PI/2 para que comience desde arriba
      const y = radius * Math.sin(angle - Math.PI / 2)

      positions.push({ id: destacadas[i].id, x, y, index: i })
    }

    return positions
  }

  const peripheralPositions = getPeripheralPositions()
  const activeStory = destacadas[activeIndex]

  return (
    <div className="relative h-[450px] flex flex-col items-center justify-center">
      {/* Efecto de transformación */}
      <AnimatePresence>
        {isTransforming && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fondo de transformación */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Destello central */}
            <motion.div
              className="absolute w-20 h-20 bg-green-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 5, 50],
                opacity: [0, 1, 0],
                transition: { duration: 1 }
              }}
              transition={{ duration: 1 }}
            />

            {/* Silueta del alienígena/historia */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: [0, 0.5, 1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-64 h-64 overflow-hidden rounded-lg border-4 border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.7)]">
                {selectedStory && (
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=${selectedStory.name}`}
                    alt={selectedStory.name}
                    fill
                    className="object-cover"
                  />
                )}

                {/* Efecto de escaneo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-green-500/50 to-transparent"
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Ondas de energía */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-green-500"
                initial={{ width: 20, height: 20, opacity: 0.8 }}
                animate={{ width: i * 300, height: i * 300, opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: 1 }}
              />
            ))}

            {/* Código ADN (efecto de texto) */}
            <motion.div
              className="absolute inset-0 overflow-hidden opacity-20 text-green-500 text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                  {Array.from({ length: 100 }).map((_, j) => (
                    <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diálogo para mostrar la historia después de la transformación */}
      <Dialog open={showStoryDialog} onOpenChange={setShowStoryDialog}>
        <DialogContent className="bg-black border-2 border-green-500 text-white max-w-sm p-0 overflow-hidden">
          <div className="aspect-square relative">
            {selectedStory && (
              <Image
                src={`/placeholder.svg?height=400&width=400&text=${selectedStory.name}`}
                alt={selectedStory.name}
                fill
                className="object-cover"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para agregar nueva historia */}
      <Dialog open={showAddStoryDialog} onOpenChange={setShowAddStoryDialog}>
        <DialogContent className="bg-black border-2 border-green-500 text-white max-w-sm p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4">Agregar nueva historia destacada</h2>
          <p className="text-gray-300 mb-4">
            Aquí podrías agregar una nueva colección de historias destacadas a tu perfil.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddStoryDialog(false)}
              className="bg-green-500 text-black px-4 py-2 rounded-md font-bold hover:bg-green-400 transition-colors"
            >
              Entendido
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Omnitrix base */}
      <div className="relative w-[320px] h-[320px] rounded-full bg-gradient-to-r from-gray-900 to-black border-4 border-gray-800 shadow-xl flex items-center justify-center">
        {/* Outer ring with details */}
        <div className="absolute inset-4 rounded-full border-2 border-gray-700"></div>

        {/* Green ring with improved glow effect */}
        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          {/* Inner black ring with texture */}
          <div className="w-[85%] h-[85%] rounded-full bg-black flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_transparent_20%,_#000_70%)]"></div>

            {/* Historia activa en el centro */}
            <motion.button
              key={`center-${activeStory.id}`}
              className={`absolute z-20 w-24 h-24 rounded-full bg-gradient-to-r ${activeStory.color} flex items-center justify-center border-4 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 transition-transform overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: isRotating ? 0.8 : 1, opacity: isRotating ? 0 : 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => startTransformation(activeStory)}
            >
              <Image
                src={`/placeholder.svg?height=100&width=100&text=${activeStory.name}`}
                alt={activeStory.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </motion.button>

            {/* Historias periféricas */}
            <AnimatePresence>
              {peripheralPositions.map((position) => {
                const story = destacadas[position.index]
                return (
                  <motion.button
                    key={`peripheral-${story.id}-${position.index}`}
                    className={`absolute w-14 h-14 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center border-2 border-gray-700 hover:border-white hover:scale-110 transition-all overflow-hidden z-10`}
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                    }}
                    initial={{
                      x: direction * 50,
                      opacity:
                        isRotating &&
                        position.index === (activeIndex === 0 ? destacadas.length - 1 : activeIndex - 1) &&
                        direction === -1
                          ? 0
                          : isRotating &&
                              position.index === (activeIndex === destacadas.length - 1 ? 0 : activeIndex + 1) &&
                              direction === 1
                            ? 0
                            : 1,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startTransformation(story)}
                  >
                    <Image
                      src={`/placeholder.svg?height=60&width=60&text=${story.name.substring(0, 3)}`}
                      alt={story.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800 z-30 hover:bg-green-400 transition-colors"
          disabled={isRotating}
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800 z-30 hover:bg-green-400 transition-colors"
          disabled={isRotating}
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Detalles adicionales del Omnitrix */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-gray-800 rounded-t-lg border-t-2 border-l-2 border-r-2 border-gray-700"></div>
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-gray-800 rounded-l-lg border-l-2 border-t-2 border-b-2 border-gray-700"></div>
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-gray-800 rounded-r-lg border-r-2 border-t-2 border-b-2 border-gray-700"></div>
      </div>

      {/* Nombre de la historia activa */}
      <div className="mt-6 bg-green-500 px-6 py-2 rounded-full text-black font-bold text-lg shadow-[0_0_10px_rgba(0,255,0,0.3)]">
        {activeStory.name}
      </div>

      {/* Botón para agregar nueva historia destacada */}
      <button
        onClick={() => setShowAddStoryDialog(true)}
        className="mt-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:bg-green-400 transition-colors border-2 border-black"
      >
        <Plus className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}
