import Image from "next/image"

export default function UltimatrixProfileFrame() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Outer Ultimatrix frame - more angular than the original Omnitrix */}
      <div className="absolute inset-0 rounded-md bg-black shadow-lg border-2 border-gray-800 flex items-center justify-center transform rotate-45">
        {/* Inner frame with angular design */}
        <div className="w-[92%] h-[92%] rounded-md bg-black border-2 border-green-600 flex items-center justify-center">
          {/* Green glow effect */}
          <div className="w-[90%] h-[90%] rounded-md bg-green-500/20 flex items-center justify-center">
            {/* Profile picture container - rotated back to normal */}
            <div className="w-[85%] h-[85%] rounded-full overflow-hidden border-2 border-green-500 transform -rotate-45">
              <Image
                src="/placeholder.svg?height=150&width=150&text=Tu+Foto"
                alt="Tu foto de perfil"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ultimatrix symbol - more angular and with the characteristic shape */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black rounded-md border-2 border-gray-800 flex items-center justify-center transform rotate-45">
        <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-black"></div>
          <div className="absolute w-1.5 h-6 bg-black"></div>
        </div>
      </div>

      {/* Additional details for the Ultimatrix */}
      <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-8 bg-gray-800 rounded-l-md"></div>
    </div>
  )
}
