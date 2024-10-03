import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from "./components/AuthProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Web Solutions CRM',
  description: 'CRM for AI Web Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}