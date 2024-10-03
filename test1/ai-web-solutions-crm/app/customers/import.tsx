'use client'

import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Upload, X } from "lucide-react"
import { useDropzone } from 'react-dropzone'

type ColumnMapping = {
    [key: string]: string
}

const IMPORT_FIELDS = [
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'company', label: 'Company Name' },
    { value: 'phone', label: 'Phone' },
    { value: 'website', label: 'Website' },
    { value: 'status', label: 'Status' },
    { value: 'leadOwner', label: 'Lead Owner' },
    { value: 'belongsTo', label: 'Belongs To' },
]

interface ImportCustomersProps {
    onClose: () => void;
    onImport: (data: any[]) => void;
}

export default function ImportCustomers({ onClose, onImport }: ImportCustomersProps) {
    const [file, setFile] = useState<File | null>(null)
    const [headers, setHeaders] = useState<string[]>([])
    const [preview, setPreview] = useState<any[]>([])
    const [columnMapping, setColumnMapping] = useState<ColumnMapping>({})
    const [error, setError] = useState<string | null>(null)
    const [isProcessed, setIsProcessed] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0]
        if (uploadedFile) {
            setFile(uploadedFile)
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result as string
                const lines = content.split('\n')
                const headers = lines[0].split(',').map(header => header.trim())
                setHeaders(headers)

                const previewData = lines.slice(1, 6).map(line => {
                    const values = line.split(',')
                    return headers.reduce((obj, header, index) => {
                        obj[header] = values[index]?.trim() || ''
                        return obj
                    }, {} as any)
                })
                setPreview(previewData)

                const initialMapping: ColumnMapping = {}
                headers.forEach(header => {
                    const matchingField = IMPORT_FIELDS.find(field =>
                        field.label.toLowerCase() === header.toLowerCase()
                    )
                    if (matchingField) {
                        initialMapping[header] = matchingField.value
                    } else {
                        initialMapping[header] = ''
                    }
                })
                setColumnMapping(initialMapping)
                setIsProcessed(true)
            }
            reader.readAsText(uploadedFile)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleColumnMappingChange = (header: string, value: string) => {
        setColumnMapping(prev => ({
            ...prev,
            [header]: value
        }))
    }

    const handleImport = () => {
        const requiredFields = ['firstName', 'lastName', 'email']
        const mappedFields = Object.values(columnMapping)
        const missingFields = requiredFields.filter(field => !mappedFields.includes(field))

        if (missingFields.length > 0) {
            setError(`Please map the following required fields: ${missingFields.join(', ')}`)
            return
        }

        if (!file) {
            setError('Please upload a file before importing.')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const content = e.target?.result as string
            const lines = content.split('\n')
            const headers = lines[0].split(',').map(header => header.trim())

            const importedData = lines.slice(1).map(line => {
                const values = line.split(',')
                const row: any = {}
                headers.forEach((header, index) => {
                    const mappedField = columnMapping[header]
                    if (mappedField) {
                        row[mappedField] = values[index]?.trim() || ''
                    }
                })
                return row
            })

            onImport(importedData)
            onClose()
        }
        reader.readAsText(file)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">Upload CSV File</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                        <input {...getInputProps()} />
                        {file ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Upload className="h-6 w-6 mr-2 text-gray-400" />
                                    <span>{file.name}</span>
                                    <span className="ml-2 text-sm text-gray-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                </div>
                                <Button variant="ghost" onClick={(e) => {
                                    e.stopPropagation()
                                    setFile(null)
                                    setIsProcessed(false)
                                }}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {isDragActive ? (
                                    <p>Drop the CSV file here ...</p>
                                ) : (
                                    <p>Drag and drop a CSV file here, or click to select a file</p>
                                )}
                            </div>
                        )}
                    </div>

                    {isProcessed && (
                        <div className="flex items-center text-green-600">
                            <Check className="h-5 w-5 mr-2" />
                            <span>File processed</span>
                        </div>
                    )}

                    {headers.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Column Mapping</h3>
                            <div className="max-h-96 overflow-y-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Column Name</TableHead>
                                            <TableHead>Select Type</TableHead>
                                            <TableHead>Sample</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {headers.map(header => (
                                            <TableRow key={header}>
                                                <TableCell>{header}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={columnMapping[header] || ''}
                                                        onValueChange={(value) => handleColumnMappingChange(header, value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select field" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="">Do not import</SelectItem>
                                                            {IMPORT_FIELDS.map(field => (
                                                                <SelectItem key={field.value} value={field.value}>
                                                                    {field.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    {preview[0]?.[header]}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <Button onClick={handleImport} disabled={!file || headers.length === 0}>
                        <Upload className="mr-2 h-4 w-4" /> Import Customers
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}