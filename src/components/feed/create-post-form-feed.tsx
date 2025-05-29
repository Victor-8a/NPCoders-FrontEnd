"use client"

import { useState, useRef } from "react"
import { ImageIcon, Send, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function CreatePostFormFeed({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && imageFiles.length === 0) {
      toast.warning("Debes escribir algo o subir una imagen")
      return
    }

    setIsSubmitting(true)

    try {
      // Convertir imágenes a base64
      const imageBase64Strings = await Promise.all(
        imageFiles.map(file => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result?.toString() || '')
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        })
      )

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          images: imageBase64Strings,
        }),
        credentials: "include",
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message || "Error al publicar")
      }

      if (imageFiles.length > 0) {
        toast.success(`Publicación creada con ${imageFiles.length} imagen(es)`)
      } else {
        toast.success("Publicación creada con éxito!")
      }

      resetForm()
      onPostCreated()
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al publicar")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setContent("")
    setImageFiles([])
    setImagePreviews([])
    setIsExpanded(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (tamaño excede 5MB)`)
        return
      }

      if (!file.type.match(/image\/(jpeg|png|jpg|gif|webp)/)) {
        invalidFiles.push(`${file.name} (formato no soportado)`)
        return
      }

      validFiles.push(file)
    })

    if (invalidFiles.length > 0) {
      toast.warning(
        `Archivos no válidos: ${invalidFiles.join(", ")}. Formatos soportados: JPEG, PNG, JPG, GIF, WEBP. Tamaño máximo: 5MB`
      )
    }

    if (validFiles.length === 0) return

    // Generar vistas previas
    const newPreviews: string[] = []
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string)
          if (newPreviews.length === validFiles.length) {
            setImagePreviews(prev => [...prev, ...newPreviews])
          }
        }
      }
      reader.readAsDataURL(file)
    })

    setImageFiles(prev => [...prev, ...validFiles])
  }

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
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

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden border border-green-500/30 group">
                  <div className="relative pt-[100%]">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover bg-gray-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-red-500/90 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <div>
              <label className={cn(
                "inline-flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-green-900/30 transition-colors",
                isSubmitting ? "opacity-50 pointer-events-none" : ""
              )}>
                <ImageIcon className="w-5 h-5 text-green-400" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isSubmitting}
                  multiple
                />
              </label>
              {imageFiles.length > 0 && (
                <span className="text-xs text-gray-400 ml-2">
                  {imageFiles.length} imagen(es) seleccionada(s)
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={(!content.trim() && imageFiles.length === 0) || isSubmitting}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all",
                (content.trim() || imageFiles.length > 0) && !isSubmitting
                  ? "bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
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