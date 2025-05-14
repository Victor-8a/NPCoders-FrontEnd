"use client"

import { useEffect, useRef } from "react"

export default function OmnitrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawOmnitrixPattern(ctx, canvas.width, canvas.height)
    }

    // Dibujar el patrón del Omnitrix
    const drawOmnitrixPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Fondo negro con gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(20, 20, 20, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Dibujar hexágonos y líneas del Omnitrix
      ctx.strokeStyle = "rgba(10, 180, 10, 0.15)"
      ctx.lineWidth = 2

      // Patrón de hexágonos
      const hexSize = 80
      const rows = Math.ceil(height / (hexSize * 1.5)) + 1
      const cols = Math.ceil(width / (hexSize * Math.sqrt(3))) + 1

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexSize * Math.sqrt(3)
          const y = row * hexSize * 1.5 + (col % 2 === 0 ? 0 : hexSize * 0.75)
          drawHexagon(ctx, x, y, hexSize)
        }
      }

      // Líneas diagonales del Omnitrix
      ctx.strokeStyle = "rgba(10, 180, 10, 0.1)"
      ctx.lineWidth = 3

      // Líneas horizontales
      for (let y = -100; y < height + 100; y += 200) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Líneas verticales
      for (let x = -100; x < width + 100; x += 200) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Símbolo del Omnitrix en el centro
      const centerX = width / 2
      const centerY = height / 2
      drawOmnitrixSymbol(ctx, centerX, centerY, 200)
    }

    // Dibujar un hexágono
    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Dibujar el símbolo del Omnitrix
    const drawOmnitrixSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      // Círculo exterior
      ctx.beginPath()
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(10, 180, 10, 0.1)"
      ctx.lineWidth = 5
      ctx.stroke()

      // Símbolo interior (forma de reloj de arena)
      ctx.beginPath()
      ctx.moveTo(x - size / 4, y - size / 4)
      ctx.lineTo(x + size / 4, y - size / 4)
      ctx.lineTo(x - size / 4, y + size / 4)
      ctx.lineTo(x + size / 4, y + size / 4)
      ctx.closePath()
      ctx.strokeStyle = "rgba(10, 180, 10, 0.15)"
      ctx.lineWidth = 3
      ctx.stroke()
    }

    // Inicializar y manejar el redimensionamiento
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
