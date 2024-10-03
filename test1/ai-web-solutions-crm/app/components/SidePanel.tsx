'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, BarChart2, FileText, Calendar, Settings } from 'lucide-react'

const navItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Blog Generator",
        href: "/blog-generator",
        icon: FileText,
    },
    {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

export function SidePanel() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    AI Web CRM
                </h2>
                <div className="space-y-1">
                    <ScrollArea className="h-[300px] px-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    pathname === item.href && "bg-muted font-medium"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}