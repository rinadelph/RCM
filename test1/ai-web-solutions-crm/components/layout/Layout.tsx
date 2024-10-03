import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Package2, Home, Settings, Mail, BarChart2, Users, Calendar } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const navItems = [
        { href: '/', icon: Home, label: 'Dashboard' },
        { href: '/cold-email-campaigns', icon: Mail, label: 'Cold Email Campaigns' },
        { href: '/analytics', icon: BarChart2, label: 'Analytics' },
        { href: '/crm', icon: Users, label: 'CRM' },
        { href: '/calendar', icon: Calendar, label: 'Calendar' },
        { href: '/settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
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
                            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname === item.href ? 'bg-gray-200' : ''
                                }`}
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
    )
}