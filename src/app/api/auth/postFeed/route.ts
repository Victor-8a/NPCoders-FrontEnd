import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get('authToken')?.value || ''
    if (!token) {
      return NextResponse.json({ message: 'Token no encontrado' }, { status: 401 })
    }

   const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`
       console.log(`Haciendo fetch a backend: ${backendUrl}`)

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const result = await backendResponse.json()

    if (!backendResponse.ok) {
      console.error('Error del backend:', result)
      return NextResponse.json(
        { message: result.message || 'Error al obtener publicaciones' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('Error interno en /api/posts:', error)
    return NextResponse.json(
      { message: 'Error interno', error: error?.message },
      { status: 500 }
    )
  }
}
