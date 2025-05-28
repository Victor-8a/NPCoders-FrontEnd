import { NextResponse } from 'next/server'

const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`

// Función para obtener el token desde cookies manualmente
function extractTokenFromCookies(cookieHeader: string | null): string {
  if (!cookieHeader) return ''
  const match = cookieHeader.match(/authToken=([^;]+)/)
  return match ? match[1] : ''
}

// GET: obtener publicaciones
export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const token = extractTokenFromCookies(cookieHeader)

    const backendResponse = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const responseData = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al obtener posts' },
        { status: backendResponse.status }
      )
    }

    const posts = Array.isArray(responseData) ? responseData : []

    const serializedData = posts.map((post: any) => ({
      ...post,
      _id: post._id?.toString?.(),
      createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : null,
      updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : null,
    }))

    return NextResponse.json(serializedData, { status: 200 })

  } catch (error) {
    console.error('Error al obtener posts:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST: crear publicación
export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const token = extractTokenFromCookies(cookieHeader)

    const formData = await req.formData()

    const backendResponse = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const responseText = await backendResponse.text()

    if (!backendResponse.ok) {
      try {
        const jsonError = JSON.parse(responseText)
        return NextResponse.json({ message: jsonError.message || "Error al crear post" }, { status: backendResponse.status })
      } catch {
        return NextResponse.json({ message: responseText || "Error desconocido" }, { status: backendResponse.status })
      }
    }

    try {
      const responseData = JSON.parse(responseText)
      return NextResponse.json(responseData, { status: 201 })
    } catch {
      return NextResponse.json({ message: "Post creado exitosamente" }, { status: 201 })
    }

  } catch (error) {
    console.error("Error interno al crear post:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
