import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockCampaigns = [
    { id: 1, name: 'Summer Sale', type: 'Email', status: 'Active', sent: 1000, opened: 300 },
    { id: 2, name: 'Product Launch', type: 'Social Media', status: 'Scheduled', sent: 0, opened: 0 },
    { id: 3, name: 'Customer Feedback', type: 'Survey', status: 'Completed', sent: 500, opened: 200 },
]

export default function CampaignsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Campaign List</CardTitle>
                    <CardDescription>Manage your marketing campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Sent</TableHead>
                                <TableHead>Opened</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCampaigns.map((campaign) => (
                                <TableRow key={campaign.id}>
                                    <TableCell>{campaign.name}</TableCell>
                                    <TableCell>{campaign.type}</TableCell>
                                    <TableCell>{campaign.status}</TableCell>
                                    <TableCell>{campaign.sent}</TableCell>
                                    <TableCell>{campaign.opened}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}