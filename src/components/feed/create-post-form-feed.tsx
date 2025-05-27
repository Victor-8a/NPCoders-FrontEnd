"use client"

import { useState } from "react"
import { ImageIcon, Send, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function CreatePostFormFeed({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && !imageFile) {
      toast.warning("Debes escribir algo o subir una imagen")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("content", content)
      if (imageFile) {
        formData.append("image", imageFile)
      }

      // CAMBIO CLAVE: Usamos el endpoint de Next.js
      try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al publicar")
      }
      
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al publicar")
      return
    }

     
      // Limpiar el formulario
      setContent("")
      setImageFile(null)
      setImagePreview(null)
      setIsExpanded(false)
      toast.success("¡Publicación creada con éxito!")
      onPostCreated()
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al publicar")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("La imagen debe ser menor a 5MB")
        return
      }

      if (!file.type.match(/image\/(jpeg|png|jpg|gif)/)) {
        toast.warning("Formato no soportado. Usa JPEG, PNG o GIF")
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 border-b border-green-500/30 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden relative group">
            <img 
              src="/user-avatar.jpg" 
              alt="Tu avatar" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-cyan-400/20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 transform -translate-x-1/2 group-hover:opacity-0 transition-opacity" />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className={cn(
            "border border-green-500/30 rounded-xl transition-all bg-gray-900/20",
            isExpanded ? "min-h-[120px]" : ""
          )}>
            <textarea
              placeholder="¿Qué está pasando en la red?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (e.target.value.length > 0) setIsExpanded(true)
              }}
              onFocus={() => setIsExpanded(true)}
              className="w-full bg-transparent border-none resize-none p-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500/50 rounded-xl"
              rows={isExpanded ? 3 : 1}
              disabled={isSubmitting}
            />
          </div>

          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-green-500/30 group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto max-h-80 object-contain bg-gray-800"
              />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />
              <button
                type="button"
                onClick={removeImage}
                disabled={isSubmitting}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-red-500/90 transition-colors group-hover:opacity-100 opacity-80"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <div>
              <label className={cn(
                "inline-flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-green-900/30 transition-colors",
                isSubmitting ? "opacity-50 pointer-events-none" : ""
              )}>
                <ImageIcon className="w-5 h-5 text-green-400" />
                <span className="sr-only">Subir imagen</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={(!content.trim() && !imageFile) || isSubmitting}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 transition-all duration-300",
                (content.trim() || imageFile) && !isSubmitting
                  ? "bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                  : "bg-green-500/20 text-gray-400 cursor-not-allowed",
                isSubmitting ? "pr-3 pl-4" : "px-4"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <span>Publicar</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
