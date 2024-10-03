import { NextApiRequest, NextApiResponse } from 'next'

interface Webhook {
    id: string
    name: string
    url: string
}

interface Settings {
    general: {
        companyName: string
        emailAddress: string
    }
    blogGenerator: {
        apiKey: string
        language: string
        webhooks: Webhook[]
    }
    // ... other settings sections ...
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const settings: Settings = req.body

            // Here you would typically save the settings to a database
            // For this example, we'll just log them and return a success response
            console.log('Received settings:', settings)

            // Simulate sending webhook information to blog SEO APIs
            for (const webhook of settings.blogGenerator.webhooks) {
                await sendWebhookToBlogSeoApi(webhook)
            }

            res.status(200).json({ message: 'Settings saved successfully' })
        } catch (error) {
            console.error('Error saving settings:', error)
            res.status(500).json({ message: 'Error saving settings' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function sendWebhookToBlogSeoApi(webhook: Webhook) {
    // This is a placeholder function to simulate sending webhook data to a blog SEO API
    console.log(`Sending webhook "${webhook.name}" to URL: ${webhook.url}`)
    // In a real implementation, you would make an API call here
    // For example:
    // await fetch(webhook.url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: webhook.name, url: webhook.url }),
    // })
}