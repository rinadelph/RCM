import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { analyticsData } from '@/lib/data'

export function AnalyticsWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>Overview of your campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={analyticsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="sent" fill="#8884d8" />
                        <Bar dataKey="opened" fill="#82ca9d" />
                        <Bar dataKey="replied" fill="#ffc658" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}