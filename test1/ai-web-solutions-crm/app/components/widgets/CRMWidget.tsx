import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { crmContacts } from '@/lib/data'

const contactColumns: ColumnDef<typeof crmContacts[0]>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "status", header: "Status" },
]

export function CRMWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>CRM</CardTitle>
                <CardDescription>Manage your contacts and leads</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={contactColumns} data={crmContacts} />
            </CardContent>
        </Card>
    )
}