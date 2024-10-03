'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function GoogleDataDisplay() {
    const [analyticsData, setAnalyticsData] = React.useState<any[]>([])
    const [searchConsoleData, setSearchConsoleData] = React.useState<any[]>([])
    const { toast } = useToast()

    React.useEffect(() => {
        const fetchGoogleData = async () => {
            try {
                const response = await fetch('/api/google-data')
                if (response.ok) {
                    const data = await response.json()
                    setAnalyticsData(data.analyticsData)
                    setSearchConsoleData(data.searchConsoleData)
                } else {
                    throw new Error('Failed to fetch Google data')
                }
            } catch (error) {
                console.error('Error fetching Google data:', error)
                toast({
                    title: "Error",
                    description: "Failed to load Google data. Please try again.",
                    variant: "destructive",
                })
            }
        }
        fetchGoogleData()
    }, [toast])

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Google Analytics Data</CardTitle>
                    <CardDescription>Last 7 days of sessions and pageviews</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        {analyticsData.map((row, index) => (
                            <li key={index}>
                                Date: {row.dimensions[0]}, Sessions: {row.metrics[0].values[0]}, Pageviews: {row.metrics[0].values[1]}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Search Console Data</CardTitle>
                    <CardDescription>Top 10 queries in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        {searchConsoleData.map((row, index) => (
                            <li key={index}>
                                Query: {row.keys[0]}, Clicks: {row.clicks}, Impressions: {row.impressions}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}