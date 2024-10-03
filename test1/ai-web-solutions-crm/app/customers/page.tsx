'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Download, Filter, Upload, Trash2, MoreVertical, X, ChevronUp, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ImportCustomers from './import'

interface Customer {
    id: string
    email: string
    status: 'Completed' | 'Contacted' | 'Not yet contacted'
    firstName: string
    lastName: string
    leadOwner: string
    belongsTo: string
    company: string
    phone: string
    website: string
}

const mockCustomers: Customer[] = [
    { id: '1', email: 'brian.lindenmeyer@transvoyant.com', status: 'Completed', firstName: 'Brian', lastName: 'Lindenmeyer', leadOwner: 'Luis Rincon', belongsTo: 'FreightForwarding Testing 1', company: 'Transvoyant', phone: '123-456-7890', website: 'transvoyant.com' },
    { id: '2', email: 'howard.posner@walmart.com', status: 'Contacted', firstName: 'Howard', lastName: 'Posner', leadOwner: 'Luis Rincon', belongsTo: 'FreightForwarding Testing 1 (copy)', company: 'Walmart', phone: '234-567-8901', website: 'walmart.com' },
    { id: '3', email: 'bruce.hayes@ohmiq.com', status: 'Completed', firstName: 'Bruce', lastName: 'Hayes', leadOwner: 'Luis Rincon', belongsTo: 'Logistics Campaign', company: 'Ohmiq', phone: '345-678-9012', website: 'ohmiq.com' },
    { id: '4', email: 'dworkman@westforwarding.com', status: 'Completed', firstName: 'Destiny', lastName: 'Workman', leadOwner: 'Luis Rincon', belongsTo: 'USA Logistics', company: 'West Forwarding', phone: '456-789-0123', website: 'westforwarding.com' },
    { id: '5', email: 'lewis.cook@catapultprint.com', status: 'Not yet contacted', firstName: 'Lewis', lastName: 'Cook', leadOwner: 'Luis Rincon', belongsTo: 'SEO Services For Frieght Fowarders/Logistics', company: 'Catapult Print', phone: '567-890-1234', website: 'catapultprint.com' },
]

const allColumns: { key: keyof Customer; label: string }[] = [
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'leadOwner', label: 'Lead Owner' },
    { key: 'belongsTo', label: 'Belongs To' },
    { key: 'company', label: 'Company' },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website' },
]

export default function CustomerListPage() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
    const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; direction: 'asc' | 'desc' } | null>(null)
    const [filters, setFilters] = useState<Partial<Customer>>({})
    const [searchTerm, setSearchTerm] = useState('')
    const [resultsPerPage, setResultsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [showImport, setShowImport] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<(keyof Customer)[]>(allColumns.map(col => col.key))

    useEffect(() => {
        // Load customers from localStorage on component mount
        const loadCustomers = () => {
            const savedCustomers = localStorage.getItem('customers')
            if (savedCustomers) {
                setCustomers(JSON.parse(savedCustomers))
            } else {
                setCustomers(mockCustomers)
            }
        }

        loadCustomers()
    }, [])

    useEffect(() => {
        // Save customers to localStorage whenever it changes
        localStorage.setItem('customers', JSON.stringify(customers))
    }, [customers])

    useEffect(() => {
        let result = customers

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter(customer => customer[key as keyof Customer]?.toString().toLowerCase().includes(value.toLowerCase()))
            }
        })

        // Apply search
        if (searchTerm) {
            result = result.filter(customer =>
                Object.values(customer).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }

        // Apply sorting
        if (sortConfig) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }

        setFilteredCustomers(result)
    }, [customers, filters, searchTerm, sortConfig])

    const handleSort = (key: keyof Customer) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const handleFilter = (key: keyof Customer, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCustomers(filteredCustomers.map(c => c.id))
        } else {
            setSelectedCustomers([])
        }
    }

    const handleSelectCustomer = (customerId: string, checked: boolean) => {
        if (checked) {
            setSelectedCustomers(prev => [...prev, customerId])
        } else {
            setSelectedCustomers(prev => prev.filter(id => id !== customerId))
        }
    }

    const handleExport = () => {
        const selectedData = filteredCustomers.filter(c => selectedCustomers.includes(c.id))
        const csv = [
            Object.keys(selectedData[0]).join(','),
            ...selectedData.map(row => Object.values(row).join(','))
        ].join('\n')

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'customers.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleImport = (importedData: any[]) => {
        const newCustomers = importedData.map((item, index) => ({
            id: `imported-${Date.now()}-${index}`,
            email: item.email || '',
            status: item.status as Customer['status'] || 'Not yet contacted',
            firstName: item.firstName || '',
            lastName: item.lastName || '',
            leadOwner: item.leadOwner || '',
            belongsTo: item.belongsTo || '',
            company: item.company || '',
            phone: item.phone || '',
            website: item.website || '',
        }))
        setCustomers(prevCustomers => [...prevCustomers, ...newCustomers])
    }

    const handleDeleteCustomers = (ids: string[]) => {
        setCustomers(prevCustomers => prevCustomers.filter(c => !ids.includes(c.id)))
        setSelectedCustomers(prevSelected => prevSelected.filter(id => !ids.includes(id)))
    }

    const handleColumnVisibilityChange = (column: keyof Customer) => {
        setVisibleColumns(prev =>
            prev.includes(column)
                ? prev.filter(col => col !== column)
                : [...prev, column]
        )
    }

    const handleColumnReorder = (column: keyof Customer, direction: 'up' | 'down') => {
        const currentIndex = visibleColumns.indexOf(column)
        if (direction === 'up' && currentIndex > 0) {
            const newColumns = [...visibleColumns]
            const temp = newColumns[currentIndex - 1]
            newColumns[currentIndex - 1] = newColumns[currentIndex]
            newColumns[currentIndex] = temp
            setVisibleColumns(newColumns)
        } else if (direction === 'down' && currentIndex < visibleColumns.length - 1) {
            const newColumns = [...visibleColumns]
            const temp = newColumns[currentIndex + 1]
            newColumns[currentIndex + 1] = newColumns[currentIndex]
            newColumns[currentIndex] = temp
            setVisibleColumns(newColumns)
        }
    }

    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <div className="flex space-x-2">
                        <Input
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button onClick={() => setShowImport(true)}>
                            <Upload className="mr-2 h-4 w-4" /> Import
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={handleExport} disabled={selectedCustomers.length === 0}>
                            <Download className="mr-2 h-4 w-4" /> Export Selected
                        </Button>
                        <Button onClick={() => handleDeleteCustomers(selectedCustomers)} disabled={selectedCustomers.length === 0} variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" /> Manage Columns
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Manage Columns</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2">
                                    {allColumns.map((column, index) => (
                                        <div key={column.key} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                                            <div className="flex items-center">
                                                <Checkbox
                                                    checked={visibleColumns.includes(column.key)}
                                                    onCheckedChange={() => handleColumnVisibilityChange(column.key)}
                                                    className="mr-2"
                                                />
                                                {column.label}
                                            </div>
                                            <div className="flex space-x-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleColumnReorder(column.key, 'up')}
                                                    disabled={!visibleColumns.includes(column.key) || index === 0}
                                                >
                                                    <ChevronUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleColumnReorder(column.key, 'down')}
                                                    disabled={!visibleColumns.includes(column.key) || index === allColumns.length - 1}
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {showImport && (
                    <ImportCustomers
                        onClose={() => setShowImport(false)}
                        onImport={handleImport}
                    />
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(filters).map(([key, value]) => (
                        value && (
                            <div key={key} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                <span className="mr-2 text-sm">{`${key}: ${value}`}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0"
                                    onClick={() => handleFilter(key as keyof Customer, '')}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )
                    ))}
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedCustomers.length === filteredCustomers.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            {visibleColumns.map((column) => (
                                <TableHead key={column} className="min-w-[100px]">
                                    <div className="flex items-center">
                                        {allColumns.find(col =>

                                            col.key === column)?.label}
                                        <Button variant="ghost" size="sm" onClick={() => handleSort(column)}>
                                            <ArrowUpDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedCustomers.includes(customer.id)}
                                        onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                                    />
                                </TableCell>
                                {visibleColumns.map((column) => (
                                    <TableCell key={column}>{customer[column]}</TableCell>
                                ))}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleDeleteCustomers([customer.id])}>
                                                Delete
                                            </DropdownMenuItem>
                                            {/* Add more actions here */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {((currentPage - 1) * resultsPerPage) + 1} to {Math.min(currentPage * resultsPerPage, filteredCustomers.length)} of {filteredCustomers.length} results
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCustomers.length / resultsPerPage)))}
                            disabled={currentPage === Math.ceil(filteredCustomers.length / resultsPerPage)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}