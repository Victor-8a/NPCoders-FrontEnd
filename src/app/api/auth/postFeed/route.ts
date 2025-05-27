import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tokenCookie = (await cookies()).get('authToken')
    const token = tokenCookie?.value || ''

    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const responseData = await backendResponse.json()
    console.log('Response from backend:', responseData)

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al obtener posts' },
        { status: backendResponse.status }
      )
    }

    // Verifica que responseData.data es un array
    const posts = Array.isArray(responseData.data) ? responseData.data : []

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
