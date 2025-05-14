import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      { message: 'Falta el userId' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/followers/counts/${userId}`,
      {
        method: 'GET', // Cambiado a GET ya que tu endpoint de backend solo consulta datos
        headers: { 'Content-Type': 'application/json' },
        // No necesitas enviar body ya que el userId va en la URL
      }
    );

    const responseData = await backendResponse.json();
    console.log('Backend response:', responseData);
    console.log(userId);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al obtener los conteos' },
        { status: backendResponse.status }
      );
    }

    // Configurar la respuesta con los datos del backend
    return NextResponse.json(
      {
        message: 'Conteos obtenidos exitosamente',
        counts: {
          followersCount: responseData.followersCount,
          followingCount: responseData.followingCount
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}