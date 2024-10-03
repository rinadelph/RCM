'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BarChart, Calendar, CheckCircle, Mail } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface AnalyticsData {
    searchConsole: {
        clicks: number;
        impressions: number;
    };
    googleAnalytics: {
        sessions: number;
        bounceRate: string;
    };
}

const mockColdEmail = {
    activeCampaigns: 3,
    totalSent: 1000,
    openRate: '25%',
    responseRate: '5%'
}

const mockTasks = [
    { id: 1, title: 'Follow up with client', done: false },
    { id: 2, title: 'Prepare presentation', done: true },
    { id: 3, title: 'Update website content', done: false },
]

const mockEvents = [
    { id: 1, title: 'Team meeting', date: '2023-06-15 10:00 AM' },
    { id: 2, title: 'Client call', date: '2023-06-16 2:00 PM' },
]

export default function Dashboard() {
    const [blogTitle, setBlogTitle] = React.useState('')
    const [blogKeywords, setBlogKeywords] = React.useState('')
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch('/api/google-data')
                if (response.ok) {
                    const data = await response.json()
                    setAnalyticsData({
                        searchConsole: {
                            clicks: data.searchConsoleData.reduce((sum: number, row: any) => sum + row.clicks, 0),
                            impressions: data.searchConsoleData.reduce((sum: number, row: any) => sum + row.impressions, 0),
                        },
                        googleAnalytics: {
                            sessions: data.analyticsData.reduce((sum: number, row: any) => sum + parseInt(row.metrics[0].values[0]), 0),
                            bounceRate: `${(data.analyticsData.reduce((sum: number, row: any) => sum + parseFloat(row.metrics[0].values[1]), 0) / data.analyticsData.length).toFixed(2)}%`,
                        },
                    })
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
        fetchAnalyticsData()
    }, [toast])

    const handleGenerateBlog = () => {
        // Implement blog generation logic here
        console.log('Generating blog with:', { blogTitle, blogKeywords })
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Overview</CardTitle>
                        <CardDescription>Google Search Console & Analytics data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsData ? (
                            <div className="space-y-2">
                                <p>Search Console Clicks: {analyticsData.searchConsole.clicks}</p>
                                <p>Search Console Impressions: {analyticsData.searchConsole.impressions}</p>
                                <p>Analytics Sessions: {analyticsData.googleAnalytics.sessions}</p>
                                <p>Analytics Bounce Rate: {analyticsData.googleAnalytics.bounceRate}</p>
                            </div>
                        ) : (
                            <p>Loading analytics data...</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cold Email Campaigns</CardTitle>
                        <CardDescription>Active campaigns and statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>Active Campaigns: {mockColdEmail.activeCampaigns}</p>
                            <p>Total Emails Sent: {mockColdEmail.totalSent}</p>
                            <p>Open Rate: {mockColdEmail.openRate}</p>
                            <p>Response Rate: {mockColdEmail.responseRate}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Unibox</CardTitle>
                        <CardDescription>Unified inbox for all communications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Implement Unibox component here</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tasks & Calendar</CardTitle>
                        <CardDescription>Upcoming tasks and events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Tasks</h4>
                                {mockTasks.map(task => (
                                    <div key={task.id} className="flex items-center space-x-2">
                                        <CheckCircle className={task.done ? 'text-green-500' : 'text-gray-300'} />
                                        <span>{task.title}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Upcoming Events</h4>
                                {mockEvents.map(event => (
                                    <div key={event.id} className="flex items-center space-x-2">
                                        <Calendar className="text-blue-500" />
                                        <span>{event.title} - {event.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Blog Generator</CardTitle>
                        <CardDescription>Generate blog post ideas quickly</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="blogTitle">Blog Title</Label>
                                <Input
                                    id="blogTitle"
                                    value={blogTitle}
                                    onChange={(e) => setBlogTitle(e.target.value)}
                                    placeholder="Enter blog title"
                                />
                            </div>
                            <div>
                                <Label htmlFor="blogKeywords">Keywords</Label>
                                <Input
                                    id="blogKeywords"
                                    value={blogKeywords}
                                    onChange={(e) => setBlogKeywords(e.target.value)}
                                    placeholder="Enter keywords, separated by commas"
                                />
                            </div>
                            <Button onClick={handleGenerateBlog}>Generate Blog Idea</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}