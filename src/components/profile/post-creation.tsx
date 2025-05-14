"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, X, Smile, MapPin, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PostCreation({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [text, setText] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_CHARS = 280
  const remainingChars = MAX_CHARS - text.length

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setText(e.target.value)
    }
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = () => {
    // Simulate image upload with placeholder
    if (images.length < 4) {
      const newImageId = Date.now()
      setImages([...images, `/placeholder.svg?height=300&width=300&text=Image${newImageId}`])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = () => {
    if (text.trim() === "" && images.length === 0) return

    setIsSubmitting(true)

    // Create new post object
    const newPost = {
      id: Date.now(),
      text,
      images,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      user: {
        name: "Tu Nombre",
        username: "tu_usuario",
        avatar: "/placeholder.svg?height=100&width=100&text=Tu+Foto",
      },
    }

    // Simulate network delay
    setTimeout(() => {
      onPostCreated(newPost)
      setText("")
      setImages([])
      setIsSubmitting(false)
    }, 1000)
  }

  // Simulated emoji list
  const emojis = ["😀", "😎", "👽", "🔥", "💥", "⚡", "🦸", "🦹", "🛸", "🌌", "🌟", "🚀"]

  return (
    <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 mb-6">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0">
          <Image
            src="/placeholder.svg?height=100&width=100&text=Tu+Foto"
            alt="Tu foto de perfil"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <Textarea
            placeholder="¿Qué está pasando en el universo?"
            value={text}
            onChange={handleTextChange}
            className="bg-transparent border-none text-white resize-none min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-lg"
          />

          {/* Image preview */}
          {images.length > 0 && (
            <div className={`grid gap-2 mb-3 ${images.length === 1 ? "" : "grid-cols-2"}`}>
              {images.map((img, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden aspect-square">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 hover:bg-black"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-3 border-t border-green-500/20 pt-3">
            <div className="flex gap-2">
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleImageClick}
                className="rounded-full text-green-400 hover:bg-green-500/20 hover:text-green-300"
                disabled={images.length >= 4 || isSubmitting}
              >
                <ImageIcon className="w-5 h-5" />
              </Button>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="rounded-full text-green-400 hover:bg-green-500/20 hover:text-green-300"
                >
                  <Smile className="w-5 h-5" />
                </Button>

                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 mb-2 bg-gray-900 border border-green-500/30 rounded-lg p-2 shadow-lg z-10"
                    >
                      <div className="grid grid-cols-6 gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setText(text + emoji)
                              setShowEmojiPicker(false)
                            }}
                            className="w-8 h-8 flex items-center justify-center hover:bg-green-500/20 rounded"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-green-400 hover:bg-green-500/20 hover:text-green-300"
              >
                <MapPin className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`text-sm ${remainingChars < 20 ? "text-orange-400" : "text-gray-400"} ${remainingChars < 0 ? "text-red-500" : ""}`}
              >
                {remainingChars}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || (text.trim() === "" && images.length === 0)}
                className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-full px-5"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Publicando...
                  </div>
                ) : (
                  "Publicar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
