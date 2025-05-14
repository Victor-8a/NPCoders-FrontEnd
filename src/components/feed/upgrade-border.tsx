"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface UpgradeBorderProps {
  className?: string
  children: React.ReactNode
  pulseEffect?: boolean
}

export default function UpgradeBorder({ className, children, pulseEffect = false }: UpgradeBorderProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {/* Fondo negro con opacidad */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>

      {/* Bordes estilo Upgrade */}
      <div className="absolute inset-0 z-0">
        {/* Borde superior */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/80 via-green-400/80 to-cyan-500/80",
            pulseEffect && "animate-pulse",
          )}
        ></div>

        {/* Borde derecho */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/80 via-green-400/80 to-cyan-500/80",
            pulseEffect && "animate-pulse",
          )}
        ></div>

        {/* Borde inferior */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/80 via-green-400/80 to-cyan-500/80",
            pulseEffect && "animate-pulse",
          )}
        ></div>

        {/* Borde izquierdo */}
        <div
          className={cn(
            "absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/80 via-green-400/80 to-cyan-500/80",
            pulseEffect && "animate-pulse",
          )}
        ></div>

        {/* Esquinas con círculos estilo Upgrade */}
        <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cyan-400/80"></div>
        <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-cyan-400/80"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-cyan-400/80"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-cyan-400/80"></div>

        {/* Líneas de circuito */}
        <div className="absolute top-1 left-3 w-1/4 h-0.5 bg-cyan-400/60"></div>
        <div className="absolute top-3 left-1 h-1/4 w-0.5 bg-cyan-400/60"></div>
        <div className="absolute top-1 right-3 w-1/4 h-0.5 bg-cyan-400/60"></div>
        <div className="absolute top-3 right-1 h-1/4 w-0.5 bg-cyan-400/60"></div>
        <div className="absolute bottom-1 left-3 w-1/4 h-0.5 bg-cyan-400/60"></div>
        <div className="absolute bottom-3 left-1 h-1/4 w-0.5 bg-cyan-400/60"></div>
        <div className="absolute bottom-1 right-3 w-1/4 h-0.5 bg-cyan-400/60"></div>
        <div className="absolute bottom-3 right-1 h-1/4 w-0.5 bg-cyan-400/60"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
