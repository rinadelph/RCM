import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { crmContacts } from '@/lib/data'

const customerColumns: ColumnDef<typeof crmContacts[0]>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "company", header: "Company" },
]

export function CustomerListWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>Overview of your customers</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={customerColumns} data={crmContacts.filter(contact => contact.status === 'Customer')} />
            </CardContent>
        </Card>
    )
}