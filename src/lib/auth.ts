// src/lib/auth.ts
import { cookies } from 'next/headers'

export const getAuthToken = async (cookiesList = cookies()) => {
  return (await cookiesList).get('authToken')?.value
}

export const setAuthToken = async (token: string) => {
  (await cookies()).set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
    sameSite: 'strict'
  })
}

export const removeAuthToken = async () => {
  (await cookies()).delete('authToken')
}

// Tipos para TypeScript
export interface UserProfile {
  id: string
  username: string
  email: string
  profilePic: string
  bio?: string
  privacidad?: 'PUBLICO' | 'PRIVADO' | 'SOLO_AMIGOS'
}