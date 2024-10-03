import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Jan", visits: 1000 },
    { name: "Feb", visits: 1200 },
    { name: "Mar", visits: 900 },
    { name: "Apr", visits: 1500 },
    { name: "May", visits: 1700 },
    { name: "Jun", visits: 1400 },
]

export function WebsiteAnalyticsWidget() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
                <CardDescription>Overview of your website performance</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip />
                        <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}