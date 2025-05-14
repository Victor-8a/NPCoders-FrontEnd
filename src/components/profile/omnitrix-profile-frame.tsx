import Image from "next/image"

export default function OmnitrixProfileFrame() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Outer Omnitrix ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg flex items-center justify-center">
        {/* Green ring */}
        <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center animate-pulse">
          {/* Inner black ring */}
          <div className="w-[85%] h-[85%] rounded-full bg-black flex items-center justify-center">
            {/* Profile picture */}
            <div className="w-[90%] h-[90%] rounded-full overflow-hidden border-2 border-green-400">
              <Image
                src="/placeholder.svg?height=150&width=150&text=Ben10"
                alt="Profile picture"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Omnitrix symbol */}
      <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-black rounded-full border-2 border-gray-700 flex items-center justify-center">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-1 bg-black"></div>
        </div>
      </div>
    </div>
  )
}
