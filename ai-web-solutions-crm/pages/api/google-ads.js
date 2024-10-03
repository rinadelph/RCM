import { getSession } from 'next-auth/react'
import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        try {
            const settings = await prisma.settings.findUnique({
                where: { userId: session.user.id },
            })

            if (!settings || !settings.googleAdsId) {
                return res.status(400).json({ error: 'Google Ads ID not set' })
            }

            const auth = new google.auth.OAuth2()
            auth.setCredentials({ access_token: session.accessToken })

            const adsService = google.ads({
                version: 'v10',
                auth: auth
            })

            const response = await adsService.customers.campaigns.list({
                customerId: settings.googleAdsId,
                pageSize: 10
            })

            res.status(200).json({ campaigns: response.data.results || [] })
        } catch (error) {
            console.error('Error fetching Google Ads data:', error)
            res.status(500).json({ error: 'Error fetching data' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}