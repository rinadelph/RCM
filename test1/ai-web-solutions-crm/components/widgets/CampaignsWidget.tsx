import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { campaigns } from '@/lib/data'

const campaignColumns: ColumnDef<typeof campaigns[0]>[] = [
    { accessorKey: "name", header: "Campaign Name" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "sentEmails", header: "Sent Emails" },
    { accessorKey: "openRate", header: "Open Rate", cell: ({ row }) => `${row.getValue("openRate")}%` },
    { accessorKey: "replyRate", header: "Reply Rate", cell: ({ row }) => `${row.getValue("replyRate")}%` },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
            </div>
        ),
    },
]

export function CampaignsWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>Manage your cold email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={campaignColumns} data={campaigns} />
                <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Campaign
                </Button>
            </CardContent>
        </Card>
    )
}