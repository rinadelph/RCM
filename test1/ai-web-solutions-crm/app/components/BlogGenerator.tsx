import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface BlogGeneratorProps {
    apiKey: string
    language: string
    webhooks: Array<{ id: string; name: string; url: string }>
}

export function BlogGenerator({ apiKey, language, webhooks }: BlogGeneratorProps) {
    const [title, setTitle] = useState('')
    const [keywords, setKeywords] = useState('')
    const [generatedContent, setGeneratedContent] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const { toast } = useToast()

    const handleGenerate = async () => {
        if (!title || !keywords) {
            toast({
                title: "Error",
                description: "Please provide both title and keywords.",
                variant: "destructive",
                duration: 3000,
            })
            return
        }

        setIsGenerating(true)
        try {
            // Simulate API call to generate blog content
            const response = await fetch('/api/generate-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, keywords, apiKey, language }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate blog content')
            }

            const data = await response.json()
            setGeneratedContent(data.content)

            // Trigger webhooks
            await Promise.all(webhooks.map(webhook =>
                fetch(webhook.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content: data.content }),
                })
            ))

            toast({
                title: "Success",
                description: "Blog content generated and webhooks triggered.",
                variant: "default",
                duration: 3000,
            })
        } catch (error) {
            console.error('Error generating blog content:', error)
            toast({
                title: "Error",
                description: "Failed to generate blog content. Please try again.",
                variant: "destructive",
                duration: 3000,
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                />
            </div>
            <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Enter keywords, separated by commas"
                />
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Blog Content'}
            </Button>
            {generatedContent && (
                <div>
                    <Label htmlFor="generatedContent">Generated Content</Label>
                    <Textarea
                        id="generatedContent"
                        value={generatedContent}
                        readOnly
                        rows={10}
                    />
                </div>
            )}
        </div>
    )
}