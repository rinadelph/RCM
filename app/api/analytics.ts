import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { prisma } from '../lib/prisma';

const analytics = google.analytics('v4');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { timeRange } = req.query;

  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    if (!settings.gaMeasurementId || !settings.gaPropertyId || !settings.serviceAccountKey) {
      return res.status(404).json({ error: 'Google Analytics settings are incomplete' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(settings.serviceAccountKey),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = await analytics.properties.runReport({
      auth,
      property: `properties/${settings.gaPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'averageSessionDuration' },
        ],
      },
    });

    // Process the analyticsData and return it
    // You'll need to format this data to match what your frontend expects

    res.status(200).json(analyticsData.data);
  } catch (error) {
    console.error('Error in analytics API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}