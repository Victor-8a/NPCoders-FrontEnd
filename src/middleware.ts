import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const config = { matcher: ['/'] }; // Solo protege rutas privadas

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  if(request.nextUrl.pathname === "/")
  {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Si no hay token y está intentando acceder a una ruta protegida
  if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Si hay token y está intentando acceder al login/registro
  if (token && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

// Removed duplicate config declaration



