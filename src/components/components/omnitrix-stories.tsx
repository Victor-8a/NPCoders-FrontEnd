"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import CreateStoryModal from "./create-story-modal"

interface Story {
  id: number
  name: string
  avatar: string
  active: boolean
}

interface OmnitrixStoriesProps {
  stories: Story[]
}

export default function OmnitrixStories({ stories }: OmnitrixStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="px-6">
      {/* Horizontal Stories */}
      <div className="flex space-x-6 overflow-x-auto pb-3 scrollbar-hide">
        {/* Add Story Option */}
        <div className="flex-shrink-0">
          <button className="flex flex-col items-center" onClick={() => setIsCreateModalOpen(true)}>
            <div className="relative w-24 h-24 mb-2">
              <div className="absolute inset-0 rounded-full bg-green-900/30 border-3 border-green-500 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>
              {/* Líneas de circuito estilo Upgrade */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-3 bg-cyan-400"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-3 bg-cyan-400"></div>
            </div>
            <span className="text-sm text-green-400 font-medium">Tu historia</span>
          </button>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <button
              className="flex flex-col items-center"
              onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
            >
              <div className="relative w-24 h-24 mb-2">
                {/* Mini Omnitrix for each story */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full border-3",
                    story.active ? "border-green-500" : "border-gray-600",
                  )}
                >
                  {/* Omnitrix Outer Ring */}
                  <div className="absolute inset-0 rounded-full bg-green-900/30 flex items-center justify-center">
                    {/* Omnitrix Inner */}
                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                      {/* Story Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-green-500">
                        <img
                          src={story.avatar || "/placeholder.svg"}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Omnitrix Symbol */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-green-500 border-2 border-black"></div>

                  {/* Líneas de circuito estilo Upgrade */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-3 bg-cyan-400"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-3 bg-cyan-400"></div>
                </div>
              </div>
              <span className={cn("text-sm font-medium", story.active ? "text-green-400" : "text-gray-400")}>
                {story.name}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <button className="absolute top-6 right-6 z-10 text-white" onClick={() => setSelectedStory(null)}>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-500">×</span>
              </div>
            </button>

            <div className="text-center p-6">
              <div className="w-28 h-28 mx-auto mb-5 relative">
                <div className="w-full h-full rounded-full border-4 border-green-500 bg-green-900/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={stories.find((s) => s.id === selectedStory)?.avatar || "/placeholder.svg"}
                      alt="Story"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Líneas de circuito estilo Upgrade */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-cyan-400"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-cyan-400"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-4 bg-cyan-400"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-4 bg-cyan-400"></div>
              </div>
              <p className="text-green-400 text-xl font-bold mb-5">
                {stories.find((s) => s.id === selectedStory)?.name}
              </p>

              <div className="bg-green-900/20 rounded-xl border border-green-500/30 aspect-[9/16] flex items-center justify-center">
                <p className="text-gray-400 text-lg">Contenido de la historia</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Story Modal */}
      <CreateStoryModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
