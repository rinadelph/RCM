'use client'

import React, { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface Settings {
    id?: string;
    companyName: string;
    emailAddress: string;
    blogApiKey: string;
    blogLanguage: string;
    gaMeasurementId: string;
    gaViewId: string;
    gaPropertyId: string;
    gscSiteUrl: string;
    gscClientId: string;
    gscClientSecret: string;
}

const defaultSettings: Settings = {
    companyName: '',
    emailAddress: '',
    blogApiKey: '',
    blogLanguage: 'en',
    gaMeasurementId: '',
    gaViewId: '',
    gaPropertyId: '',
    gscSiteUrl: '',
    gscClientId: '',
    gscClientSecret: '',
}

export default function SettingsContent() {
    const [settings, setSettings] = useState<Settings>(defaultSettings)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings')
                if (response.ok) {
                    const data = await response.json()
                    setSettings(data)
                } else {
                    throw new Error('Failed to fetch settings')
                }
            } catch (error) {
                console.error('Error fetching settings:', error)
                toast({
                    title: "Error",
                    description: "Failed to load settings. Please try again.",
                    variant: "destructive",
                })
            }
        }
        fetchSettings()
    }, [toast])

    const handleInputChange = (key: keyof Settings, value: string) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [key]: value
        }))
    }

    const handleSaveSettings = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            })
            if (response.ok) {
                toast({
                    title: "Settings saved",
                    description: "Your settings have been successfully saved.",
                    variant: "default",
                })
            } else {
                throw new Error('Failed to save settings')
            }
        } catch (error) {
            console.error('Error saving settings:', error)
            toast({
                title: "Error",
                description: "There was an error saving your settings. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Settings</h1>
                <Button onClick={() => signOut()}>Sign out</Button>
            </div>
            <Tabs defaultValue="general">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="blogGenerator">Blog Generator</TabsTrigger>
                    <TabsTrigger value="googleServices">Google Services</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Manage your general account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    value={settings.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emailAddress">Email Address</Label>
                                <Input
                                    id="emailAddress"
                                    type="email"
                                    value={settings.emailAddress}
                                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="blogGenerator">
                    <Card>
                        <CardHeader>
                            <CardTitle>Blog Generator Settings</CardTitle>
                            <CardDescription>Configure your blog generator settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="blogApiKey">API Key</Label>
                                <Input
                                    id="blogApiKey"
                                    type="password"
                                    value={settings.blogApiKey}
                                    onChange={(e) => handleInputChange('blogApiKey', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="blogLanguage">Language</Label>
                                <Input
                                    id="blogLanguage"
                                    value={settings.blogLanguage}
                                    onChange={(e) => handleInputChange('blogLanguage', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="googleServices">
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Google Analytics</CardTitle>
                                <CardDescription>Configure Google Analytics settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gaMeasurementId">Measurement ID</Label>
                                    <Input
                                        id="gaMeasurementId"
                                        value={settings.gaMeasurementId}
                                        onChange={(e) => handleInputChange('gaMeasurementId', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gaViewId">View ID</Label>
                                    <Input
                                        id="gaViewId"
                                        value={settings.gaViewId}
                                        onChange={(e) => handleInputChange('gaViewId', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gaPropertyId">Property ID</Label>
                                    <Input
                                        id="gaPropertyId"
                                        value={settings.gaPropertyId}
                                        onChange={(e) => handleInputChange('gaPropertyId', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Google Search Console</CardTitle>
                                <CardDescription>Configure Google Search Console settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gscSiteUrl">Site URL</Label>
                                    <Input
                                        id="gscSiteUrl"
                                        value={settings.gscSiteUrl}
                                        onChange={(e) => handleInputChange('gscSiteUrl', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gscClientId">Client ID</Label>
                                    <Input
                                        id="gscClientId"
                                        value={settings.gscClientId}
                                        onChange={(e) => handleInputChange('gscClientId', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gscClientSecret">Client Secret</Label>
                                    <Input
                                        id="gscClientSecret"
                                        type="password"
                                        value={settings.gscClientSecret}
                                        onChange={(e) => handleInputChange('gscClientSecret', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="mt-6">
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Settings'
                    )}
                </Button>
            </div>
        </div>
    )
}