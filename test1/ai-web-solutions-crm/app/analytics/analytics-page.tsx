import React, { useState, useEffect } from 'react'
import { Session } from "next-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Loader2 } from 'lucide-react'

interface AnalyticsPageProps {
    session: Session
}

export default function AnalyticsPage({ session }: AnalyticsPageProps) {
    const [analyticsData, setAnalyticsData] = useState<any[]>([])
    const [searchConsoleData, setSearchConsoleData] = useState<any[]>([])
    const [googleAdsData, setGoogleAdsData] = useState<any[]>([])
    const [period, setPeriod] = useState('7d')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [analyticsResponse, searchConsoleResponse, googleAdsResponse] = await Promise.all([
                    fetch('/api/analytics'),
                    fetch('/api/search-console'),
                    fetch('/api/google-ads')
                ])

                if (analyticsResponse.ok && searchConsoleResponse.ok && googleAdsResponse.ok) {
                    const analyticsData = await analyticsResponse.json()
                    const searchConsoleData = await searchConsoleResponse.json()
                    const googleAdsData = await googleAdsResponse.json()

                    setAnalyticsData(analyticsData.rows || [])
                    setSearchConsoleData(searchConsoleData.rows || [])
                    setGoogleAdsData(googleAdsData.campaigns || [])
                } else {
                    console.error('Error fetching data')
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [period])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

            <div className="mb-6">
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Tabs defaultValue="analytics">
                <TabsList>
                    <TabsTrigger value="analytics">Google Analytics</TabsTrigger>
                    <TabsTrigger value="search-console">Search Console</TabsTrigger>
                    <TabsTrigger value="google-ads">Google Ads</TabsTrigger>
                </TabsList>

                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Traffic</CardTitle>
                            <CardDescription>Overview of users, sessions, and pageviews</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analyticsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="dimensionValues[0].value" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="metricValues[0].value" name="Users" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="metricValues[1].value" name="Sessions" stroke="#82ca9d" />
                                        <Line type="monotone" dataKey="metricValues[2].value" name="Pageviews" stroke="#ffc658" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="search-console">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Performance</CardTitle>
                            <CardDescription>Top queries from Google Search</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Query</TableHead>
                                        <TableHead>Clicks</TableHead>
                                        <TableHead>Impressions</TableHead>
                                        <TableHead>CTR</TableHead>
                                        <TableHead>Position</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {searchConsoleData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.keys[0]}</TableCell>
                                            <TableCell>{row.clicks}</TableCell>
                                            <TableCell>{row.impressions}</TableCell>
                                            <TableCell>{(row.ctr * 100).toFixed(2)}%</TableCell>
                                            <TableCell>{row.position.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="google-ads">
                    <Card>
                        <CardHeader>
                            <CardTitle>Google Ads Performance</CardTitle>
                            <CardDescription>Overview of your Google Ads campaigns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Clicks</TableHead>
                                        <TableHead>Impressions</TableHead>
                                        <TableHead>CTR</TableHead>
                                        <TableHead>Cost</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {googleAdsData.map((campaign, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{campaign.name}</TableCell>
                                            <TableCell>{campaign.clicks}</TableCell>
                                            <TableCell>{campaign.impressions}</TableCell>
                                            <TableCell>{(campaign.ctr * 100).toFixed(2)}%</TableCell>
                                            <TableCell>${campaign.cost.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}