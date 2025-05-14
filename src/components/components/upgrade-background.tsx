"use client"

import { useEffect, useRef } from "react"

export default function UpgradeBackground() {
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
      drawUpgradePattern(ctx, canvas.width, canvas.height)
    }

    // Dibujar el patrón de circuitos de Upgrade
    const drawUpgradePattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Fondo negro
      ctx.fillStyle = "rgb(0, 0, 0)"
      ctx.fillRect(0, 0, width, height)

      // Configuración para los circuitos
      ctx.lineWidth = 2
      ctx.strokeStyle = "rgba(0, 255, 140, 0.4)"

      // Dibujar circuitos principales
      drawCircuits(ctx, width, height)

      // Dibujar nodos de circuito
      drawCircuitNodes(ctx, width, height)

      // Dibujar círculos de energía
      drawEnergyCircles(ctx, width, height)
    }

    // Dibujar los circuitos principales
    const drawCircuits = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Líneas horizontales
      for (let y = 50; y < height; y += 200) {
        ctx.beginPath()
        // Línea principal
        ctx.moveTo(0, y)

        // Crear zigzag
        for (let x = 0; x < width; x += 50) {
          const offsetY = Math.random() > 0.5 ? y + 15 : y - 15
          ctx.lineTo(x, offsetY)
        }

        ctx.lineTo(width, y)
        ctx.stroke()

        // Líneas secundarias
        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.moveTo(width * Math.random(), y)
          ctx.lineTo(width * Math.random(), y + 100 + Math.random() * 100)
          ctx.stroke()
        }
      }

      // Líneas verticales
      for (let x = 100; x < width; x += 300) {
        ctx.beginPath()
        ctx.moveTo(x, 0)

        // Crear zigzag
        for (let y = 0; y < height; y += 50) {
          const offsetX = Math.random() > 0.5 ? x + 15 : x - 15
          ctx.lineTo(offsetX, y)
        }

        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Líneas diagonales
      for (let i = 0; i < 5; i++) {
        const startX = Math.random() * width
        const startY = Math.random() * height
        const endX = startX + (Math.random() - 0.5) * 400
        const endY = startY + (Math.random() - 0.5) * 400

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Ramificaciones
        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.moveTo((startX + endX) / 2, (startY + endY) / 2)
          ctx.lineTo(
            (startX + endX) / 2 + (Math.random() - 0.5) * 200,
            (startY + endY) / 2 + (Math.random() - 0.5) * 200,
          )
          ctx.stroke()
        }
      }
    }

    // Dibujar nodos de circuito
    const drawCircuitNodes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = 5 + Math.random() * 15

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(0, 255, 140, 0.5)"
        ctx.stroke()

        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(0, 255, 140, 0.3)"
          ctx.fill()
        }
      }
    }

    // Dibujar círculos de energía
    const drawEnergyCircles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Círculo grande central
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.2

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(0, 255, 140, 0.2)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Círculo interior
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(0, 255, 140, 0.15)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Patrón de Upgrade en el centro
      drawUpgradeSymbol(ctx, centerX, centerY, radius * 0.5)
    }

    // Dibujar el símbolo de Upgrade
    const drawUpgradeSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x - size, y - size)
      ctx.lineTo(x + size, y - size)
      ctx.lineTo(x, y + size)
      ctx.closePath()
      ctx.strokeStyle = "rgba(0, 255, 140, 0.4)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Círculo central
      ctx.beginPath()
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 255, 140, 0.2)"
      ctx.fill()
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
      style={{ opacity: 0.9 }}
    />
  )
}
