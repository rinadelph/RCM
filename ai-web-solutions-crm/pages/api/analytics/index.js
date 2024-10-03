import { getSession } from 'next-auth/react'
import { google } from 'googleapis'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        try {
            const auth = new google.auth.OAuth2()
            auth.setCredentials({ access_token: session.accessToken })

            const analyticsDataClient = google.analyticsdata({
                version: 'v1beta',
                auth: auth
            })

            const response = await analyticsDataClient.properties.runReport({
                property: `properties/${publicRuntimeConfig.GA4_PROPERTY_ID}`,
                requestBody: {
                    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
                    dimensions: [{ name: 'date' }]
                }
            })

            res.status(200).json(response.data)
        } catch (error) {
            console.error('Error fetching Google Analytics data:', error)
            res.status(500).json({ error: 'Error fetching data' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}