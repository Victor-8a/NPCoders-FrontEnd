import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // 1. Autenticación
    const cookieStore = cookies()
    const token = (await cookieStore).get('authToken')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'No autorizado', details: 'Token faltante' },
        { status: 401 }
      )
    }

    // 2. Procesar JSON
    const requestData = await request.json()
    const { content, images } = requestData

    // 3. Validaciones básicas
    if ((!content || content.trim() === '') && (!images || images.length === 0)) {
      return NextResponse.json(
        { 
          message: 'Se requiere contenido o al menos una imagen',
          receivedData: {
            content: content,
            images: images?.length || 0
          }
        },
        { status: 400 }
      )
    }

    // 4. Validar imágenes
    const invalidImages: string[] = []
    const validImages: string[] = []

    if (images && images.length > 0) {
      images.forEach((base64String: string, index: number) => {
        try {
          // Validar que sea un string base64 válido
          if (!base64String.startsWith('data:image/')) {
            invalidImages.push(`Imagen ${index + 1} no es un base64 válido`)
            return
          }

          // Extraer la parte de datos del base64
          const base64Data = base64String.split(',')[1]
          if (!base64Data) {
            invalidImages.push(`Imagen ${index + 1} tiene formato base64 incorrecto`)
            return
          }

          // Calcular tamaño aproximado (1 byte por cada 1.37 caracteres base64)
          const sizeInBytes = (base64Data.length * 3) / 4
          if (sizeInBytes > 5 * 1024 * 1024) {
            invalidImages.push(`Imagen ${index + 1} supera 5MB (${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB)`)
            return
          }

          validImages.push(base64String)
        } catch (error) {
          invalidImages.push(`Error procesando imagen ${index + 1}`)
        }
      })
    }

    if (invalidImages.length > 0) {
      return NextResponse.json(
        {
          message: 'Algunas imágenes no son válidas',
          details: invalidImages,
          validImagesCount: validImages.length,
          receivedImages: images?.length || 0
        },
        { status: 400 }
      )
    }

    // 5. Preparar datos para el backend
    const backendData = {
      content: content || '',
      images: validImages,
    }

    // 6. Enviar al backend
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      body: JSON.stringify(backendData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    // 7. Procesar respuesta
    let responseData
    try {
      responseData = await backendResponse.json()
    } catch (error) {
      responseData = {
        message: 'Error al parsear respuesta del backend',
        backendStatus: backendResponse.status,
        statusText: backendResponse.statusText
      }
    }

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: 'Error en el backend',
          backendError: responseData,
          requestDetails: {
            contentLength: content?.length || 0,
            imagesSent: validImages.length
          }
        },
        { 
          status: backendResponse.status 
        }
      )
    }

    return NextResponse.json(responseData, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}