// app/api/posts/route.ts

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const tokenCookie = (await cookies()).get('authToken')
    const token = tokenCookie?.value || ''

    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/posts`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    console.log(tokenCookie, 'token')
    const responseData = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al crear el post' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json({
      message: 'Post creado con éxito',
      data: responseData.data,
    }, {
      status: 201
    })

  } catch (error) {
    console.error('Error al crear post:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
