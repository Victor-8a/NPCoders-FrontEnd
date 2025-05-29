"use client"

import { useRef, useState } from "react"
import { ImageIcon, Send, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function PostCreation({ onPostCreated }: { onPostCreated: (newPost: any) => void }) {
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && !imageFile) {
      toast.warning("Debes escribir algo o subir una imagen")
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("content", content)
    if (imageFile) formData.append("image", imageFile)

    try {
      const res = await fetch("/api/auth/postFeed", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al publicar")
      }

      const newPost = await res.json()

      setContent("")
      setImageFile(null)
      setImagePreview(null)
      toast.success("¡Publicación creada con éxito!")
      onPostCreated(newPost)
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Error al publicar")
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-black/60 border border-green-500/30 rounded-lg space-y-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
          <Image
            src="/user-avatar.jpg"
            alt="Tu foto de perfil"
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <Textarea
            placeholder="¿Qué está pasando en tu universo?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-transparent border-none text-white resize-none min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-lg"
            disabled={isSubmitting}
          />

          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-green-500/30 group mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto max-h-80 object-contain bg-gray-800"
              />
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

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-green-500/20">
            <label
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-green-900/30 transition-colors",
                isSubmitting ? "opacity-50 pointer-events-none" : ""
              )}
            >
              <ImageIcon className="w-5 h-5 text-green-400" />
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/gif"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
                disabled={isSubmitting}
              />
            </label>

            <Button
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
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
