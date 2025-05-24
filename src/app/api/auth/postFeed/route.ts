// app/api/postFeed/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`, {
      method: 'GET',
      credentials: 'include'
    })

    const responseData = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al obtener posts' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json(responseData.data, { status: 200 })

  } catch (error) {
    console.error('Error al obtener posts:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
