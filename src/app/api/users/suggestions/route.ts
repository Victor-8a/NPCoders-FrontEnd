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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/followers/getSuggestions/${userId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const responseData = await backendResponse.json();

    console.log('Backend response Sugestions:', responseData);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || 'Error al obtener sugerencias' },
        { status: backendResponse.status }
      );
    }
    console.log('Sugerencias:', responseData);
    return NextResponse.json(responseData, { status: 200 });


  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}