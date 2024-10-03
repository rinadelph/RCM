import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Package2, Home, Settings, Mail, BarChart2, Users, Calendar } from 'lucide-react'
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/components/AuthProvider'
import { SessionProvider } from "next-auth/react"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Web CRM',
    description: 'AI-powered CRM for web professionals',
}

const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/cold-email-campaigns', icon: Mail, label: 'Cold Email Campaigns' },
    { href: '/analytics', icon: BarChart2, label: 'Analytics' },
    { href: '/crm', icon: Users, label: 'CRM' },
    { href: '/calendar', icon: Calendar, label: 'Calendar' },
    { href: '/settings', icon: Settings, label: 'Settings' },
]

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <AuthProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                                <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                                    <div className="p-4">
                                        <h1 className="text-2xl font-bold flex items-center text-primary">
                                            <Package2 className="mr-2" />
                                            AI Web CRM
                                        </h1>
                                    </div>
                                    <nav className="mt-8">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                                            >
                                                <item.icon className="mr-2 h-5 w-5" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </aside>
                                <main className="flex-1 overflow-y-auto p-8">
                                    {children}
                                </main>
                            </div>
                            <Toaster />
                        </ThemeProvider>
                    </AuthProvider>
                </SessionProvider>
            </body>
        </html>
    )
}