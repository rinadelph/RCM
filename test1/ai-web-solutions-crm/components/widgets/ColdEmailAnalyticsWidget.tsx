import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { campaigns } from '@/lib/data'

export function ColdEmailAnalyticsWidget() {
    const data = campaigns.map(campaign => ({
        name: campaign.name,
        sent: campaign.sentEmails,
        opened: Math.round(campaign.sentEmails * (campaign.openRate / 100)),
        replied: Math.round(campaign.sentEmails * (campaign.replyRate / 100)),
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cold Email Analytics</CardTitle>
                <CardDescription>Performance metrics for your cold email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sent" fill="#8884d8" />
                        <Bar dataKey="opened" fill="#82ca9d" />
                        <Bar dataKey="replied" fill="#ffc658" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}