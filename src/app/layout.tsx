import { Inter } from 'next/font/google'
import './globals.css'  

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}