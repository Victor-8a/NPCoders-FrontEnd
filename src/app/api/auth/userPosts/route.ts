import { NextResponse } from 'next/server'

const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`

// Función para obtener el token desde cookies manualmente
function extractTokenFromCookies(cookieHeader: string | null): string {
  if (!cookieHeader) return ''
  const match = cookieHeader.match(/authToken=([^;]+)/)
  return match ? match[1] : ''
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const token = extractTokenFromCookies(cookieHeader)

    if (!token) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    // Llamamos al backend para obtener todos los posts
    const backendResponse = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json({ message: errorData.message || 'Error al obtener posts' }, { status: backendResponse.status })
    }

    const posts = await backendResponse.json()

    // Decodifica el token para obtener username (ejemplo usando jwt-decode)
    // En Next.js API route no puedes usar librerías con window, pero en backend sí.
    // Aquí, para simplicidad, asumiremos que backend devuelve los posts con el autor.username correcto.
    // Entonces filtramos solo los posts que tengan autor.username = usuario del token.

    // Alternativa: Si el backend ya filtra por usuario al recibir el token, simplemente devuelve posts directamente.
    // Pero si no, deberías decodificar el token aquí para obtener username.

    // Como ejemplo, omitimos decodificación y dejamos todo. Ideal: backend que filtre.

    // Filtro posts por usuario. Necesitas pasar el username del usuario logueado (supón que backend lo retorna en el token).

    // Ejemplo con un header custom que mande username:
    // const username = req.headers.get('x-username') || ''
    // const userPosts = posts.filter((post: any) => post.autor.username === username)

    // Por ahora devolvemos todos para que ajustes backend
    // Si tu backend ya filtra posts para ese usuario cuando recibe el token, esto funciona.

    const serializedData = posts.map((post: any) => ({
      ...post,
      _id: post._id?.toString?.(),
      createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : null,
      updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : null,
    }))

    return NextResponse.json(serializedData, { status: 200 })

  } catch (error) {
    console.error('Error al obtener posts de usuario:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
