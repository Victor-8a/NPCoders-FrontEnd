"use client"

import type React from "react"

import { useState } from "react"
import { ImageIcon, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CreatePostForm() {
  const [content, setContent] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para publicar el post
    console.log("Publicando:", { content, imagePreview })
    setContent("")
    setImagePreview(null)
    setIsExpanded(false)
  }

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

  const removeImage = () => {
    setImagePreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-green-500 overflow-hidden relative">
            <img src="/placeholder.svg?height=50&width=50" alt="Tu avatar" className="w-full h-full object-cover" />
            {/* Líneas de circuito estilo Upgrade */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-2 bg-cyan-400"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-2 bg-cyan-400"></div>
          </div>
        </div>

        {/* Post Input */}
        <div className="flex-1">
          <div
            className={cn(
              "border border-green-500/30 rounded-xl overflow-hidden transition-all",
              isExpanded ? "min-h-[120px]" : "",
            )}
          >
            <textarea
              placeholder="¿Qué está pasando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full bg-transparent border-none resize-none p-4 text-base text-white placeholder-gray-500 focus:outline-none"
              rows={isExpanded ? 3 : 2}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mx-4 mb-4">
                <div className="rounded-xl overflow-hidden border border-green-500/30 relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                  {/* Líneas de circuito en las esquinas */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60"></div>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Actions */}
            {isExpanded && (
              <div className="flex justify-between items-center p-3 border-t border-green-500/30">
                <div>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center hover:bg-green-900/50 transition-colors">
                      <ImageIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim() && !imagePreview}
                  className={cn(
                    "px-5 py-2 rounded-full text-base font-bold flex items-center space-x-2 transition-colors",
                    content.trim() || imagePreview
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "bg-green-500/30 text-gray-400 cursor-not-allowed",
                  )}
                >
                  <span>Publicar</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
