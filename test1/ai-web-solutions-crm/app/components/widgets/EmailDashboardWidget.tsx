import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { campaigns } from '@/lib/data'

export function EmailDashboardWidget() {
    const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.sentEmails, 0)
    const averageOpenRate = campaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / campaigns.length
    const averageReplyRate = campaigns.reduce((sum, campaign) => sum + campaign.replyRate, 0) / campaigns.length

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Dashboard</CardTitle>
                <CardDescription>Overview of your email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{totalSent}</span>
                        <span className="text-sm text-muted-foreground">Total Sent</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{averageOpenRate.toFixed(2)}%</span>
                        <span className="text-sm text-muted-foreground">Avg. Open Rate</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{averageReplyRate.toFixed(2)}%</span>
                        <span className="text-sm text-muted-foreground">Avg. Reply Rate</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}