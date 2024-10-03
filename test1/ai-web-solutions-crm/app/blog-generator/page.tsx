import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function BlogGeneratorPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Blog Generator</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Generate Blog Post</CardTitle>
                    <CardDescription>Enter details to generate a blog post</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Blog Title</Label>
                            <Input id="title" placeholder="Enter blog title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" placeholder="Enter keywords, separated by commas" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outline">Blog Outline</Label>
                            <Textarea id="outline" placeholder="Enter blog outline" rows={5} />
                        </div>
                        <Button type="submit">Generate Blog Post</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}