// src/app/api/users/[userId]/following/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Leer el cuerpo de la solicitud
    const body = await request.json();
    const userId = body.userId ?? body.IdUser;
    const userToFollowId = body.userToFollowId ?? body.followerId ?? body.targetUserId;

    // 2. Validar userId
    if (!userId) {
      return NextResponse.json(
        { message: 'Falta el parámetro userId en el cuerpo de la solicitud' },
        { status: 400 }
      );
    }
    console.log('userId:', userId);
    console.log('userToFollowId:', userToFollowId);

    if (!userToFollowId) {
        console.log('Falta el parámetro userToUnfollowId en el cuerpo de la solicitud');
      return NextResponse.json(
        { message: 'Falta el parámetro userToUnfollowId en el cuerpo de la solicitud' },
        { status: 400 }
      );
    }

    // 3. Hacer petición al backend
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/followers/follow/${userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userToFollowId }),
      }
    );



    // 4. Manejar errores del backend
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        {
          message: errorData.message || 'Error al obtener seguidores',
          backendError: true,
        },
        { status: backendResponse.status }
      );
    }

    // 5. Procesar respuesta exitosa
    const responseData = await backendResponse.json();
    console.log('Datos completos del backend:', responseData);

    if (!responseData.following || responseData.following.length === 0) {
      console.warn('El backend devolvió una respuesta vacía o sin la propiedad "following".');
      return NextResponse.json(
        {
          message: 'No se encontraron usuarios seguidos.',
          following: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: 'Datos obtenidos exitosamente',
        following: responseData.following,
      },
      { status: 200 }
    );
  } catch (error) {
    // 6. Manejar errores inesperados
    console.error('Error en API route:', error);
    return NextResponse.json(
      {
        message: 'Error de conexión con el servidor',
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}