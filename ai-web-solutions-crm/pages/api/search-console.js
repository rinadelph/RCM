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

            if (!settings || !settings.searchConsoleUrl) {
                return res.status(400).json({ error: 'Search Console URL not set' })
            }

            const auth = new google.auth.OAuth2()
            auth.setCredentials({ access_token: session.accessToken })

            const searchconsole = google.searchconsole({ version: 'v1', auth })

            const response = await searchconsole.searchanalytics.query({
                siteUrl: settings.searchConsoleUrl,
                requestBody: {
                    startDate: '7daysAgo',
                    endDate: 'today',
                    dimensions: ['query'],
                    rowLimit: 10
                }
            })

            res.status(200).json(response.data)
        } catch (error) {
            console.error('Error fetching Search Console data:', error)
            res.status(500).json({ error: 'Error fetching data' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}