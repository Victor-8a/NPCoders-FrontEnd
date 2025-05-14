import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, email, password, bio, profilePic, privacidad } = await request.json();

  // Validaciones básicas
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: 'Nombre de usuario, email y contraseña son requeridos' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: 'La contraseña debe tener al menos 6 caracteres' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          bio: bio || '',
          profilePic: profilePic || 'default.jpg',
          privacidad: privacidad,
          followersIds: [],
          followingIds: [],
          blockedIds: [],
          chatIds: []
        }),
      }
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error en el registro' },
        { status: backendResponse.status }
      );
    }

    const response = NextResponse.json(
      { 
        message: 'Registro exitoso', 
        user: responseData.data.user 
      },
      { status: 201 }
    );

    if (responseData.data.token) {
      response.cookies.set('authToken', responseData.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: '/',
        sameSite: 'strict'
      });
    }

    return response;

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}