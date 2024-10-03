import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { opportunities } from '@/lib/data'

const opportunityColumns: ColumnDef<typeof opportunities[0]>[] = [
    { accessorKey: "name", header: "Opportunity" },
    { accessorKey: "value", header: "Value", cell: ({ row }) => `$${row.getValue("value")}` },
    { accessorKey: "stage", header: "Stage" },
    { accessorKey: "probability", header: "Probability", cell: ({ row }) => `${row.getValue("probability")}%` },
]

export function OpportunitiesWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Opportunities</CardTitle>
                <CardDescription>Track your sales pipeline</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={opportunityColumns} data={opportunities} />
            </CardContent>
        </Card>
    )
}