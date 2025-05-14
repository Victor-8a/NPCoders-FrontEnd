"use client"

import type React from "react"

import { useState } from "react"
import { Camera, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateStoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateStoryModal({ isOpen, onClose }: CreateStoryModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")

  if (!isOpen) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para publicar la historia
    console.log("Publicando historia:", { imagePreview, caption })
    setImagePreview(null)
    setCaption("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* <UpgradeBorder className="w-full max-w-md p-5" pulseEffect> */}
      <div className="relative w-full max-w-md bg-black border border-green-500 rounded-xl p-5">
        <button className="absolute top-4 right-4 z-10 text-white" onClick={onClose}>
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <X className="w-6 h-6 text-green-500" />
          </div>
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-4">Crear historia</h2>

        <form onSubmit={handleSubmit}>
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-500/50 rounded-xl h-80 mb-4">
              <label htmlFor="story-image-upload" className="cursor-pointer flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mb-4">
                  <Camera className="w-10 h-10 text-green-500" />
                </div>
                <span className="text-base text-green-400">Selecciona una imagen</span>
                <input
                  id="story-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="relative mb-4">
              <div className="rounded-xl overflow-hidden border border-green-500/30 aspect-[9/16] max-h-80">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                {/* Líneas de circuito en las esquinas */}
                {/* <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60"></div> */}
              </div>
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          <div className="mb-4">
            <textarea
              placeholder="Añade una descripción..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-transparent border border-green-500/30 rounded-xl p-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={!imagePreview}
            className={cn(
              "w-full py-3 rounded-full text-base font-bold transition-colors",
              imagePreview
                ? "bg-green-500 text-black hover:bg-green-400"
                : "bg-green-500/30 text-gray-400 cursor-not-allowed",
            )}
          >
            Publicar historia
          </button>
        </form>
      </div>
      {/* </UpgradeBorder> */}
    </div>
  )
}
