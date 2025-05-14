import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json(
        { message: 'Falta el parámetro userId' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/followers/getFollowers/${userId}`,
      { method: 'GET' }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { message: errorData.message || 'Error al obtener seguidores' },
        { status: backendResponse.status }
      );
    }

    const responseData = await backendResponse.json();
    return NextResponse.json(
      { 
        message: 'Datos obtenidos exitosamente', 
        followers: responseData.followers || [] 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}