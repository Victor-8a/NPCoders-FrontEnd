import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Faltan email o password' },
      { status: 400 }
    );
  }

  try {
    console.log('Login attempt:', email);

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );

    const responseData = await backendResponse.json();
    console.log('Backend response:', responseData);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error en el login' },
        { status: backendResponse.status }
      );
    }

    const token = responseData.data?.token;
    const user = responseData.data?.user;
    const username = user?.username;
    const userId = user?.id;
    const profilePic = user?.profilePic || 'default.jpg';

    if (!token || !username || !userId) {
      return NextResponse.json(
        { message: 'Datos de autenticación incompletos' },
        { status: 500 }
      );
    }

    // Configurar la respuesta
    const response = NextResponse.json(
      {
        message: 'Inicio de sesión exitoso',
        user: {
          id: userId,
          username,
          email: user.email,
          profilePic
        },
        // Solo envía token en desarrollo (para pruebas)
        token: process.env.NODE_ENV === 'development' ? token : undefined,
      },
      { status: 200 }
    );

    // Configuración común para las cookies
    const cookieOptions = {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
      sameSite: 'strict' as const,
    };

    // 1. Cookie authToken (httpOnly, segura - no accesible desde JS)
    response.cookies.set('authToken', token, {
      ...cookieOptions,
      httpOnly: true,
    });

    // 2. Cookie userId (httpOnly por seguridad)
    response.cookies.set('userId', userId, {
      ...cookieOptions,
      httpOnly: true,
    });

    // 3. Cookie username (accesible desde el cliente si es necesario)
    response.cookies.set('username', username, {
      ...cookieOptions,
      httpOnly: false, // Permitir acceso desde JS
    });

    // 4. Cookie profilePic (opcional, accesible desde el cliente)
    response.cookies.set('profilePic', profilePic, {
      ...cookieOptions,
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}