import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { uniboxMessages } from '@/lib/data'

const messageColumns: ColumnDef<typeof uniboxMessages[0]>[] = [
    { accessorKey: "from", header: "From" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "campaign", header: "Campaign" },
]

export function UniboxWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Unibox</CardTitle>
                <CardDescription>Unified inbox for all your campaign responses</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={messageColumns} data={uniboxMessages} />
            </CardContent>
        </Card>
    )
}