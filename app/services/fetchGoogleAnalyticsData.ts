import { google } from 'googleapis';
import prisma from '@/lib/prisma';

export async function fetchAndStoreGoogleAnalyticsData() {
  try {
    // Set up Google Analytics client
    const analytics = google.analytics('v3');

    // Fetch the latest Google service credentials
    const googleService = await prisma.service.findFirst({
      where: { type: 'analytics' },
      include: { credential: true },
    });

    if (!googleService || !googleService.credential) {
      throw new Error('Google Analytics credentials not found');
    }

    const auth = new google.auth.JWT({
      email: googleService.credential.clientEmail,
      key: googleService.credential.privateKey,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    // Fetch data from Google Analytics
    const response = await analytics.data.ga.get({
      auth,
      ids: 'ga:' + googleService.gaPropertyId,
      'start-date': '7daysAgo',
      'end-date': 'today',
      metrics: 'ga:pageviews,ga:sessions,ga:bounceRate,ga:users,ga:newUsers,ga:avgTimeOnPage',
      dimensions: 'ga:date',
    });

    if (!response.data.rows) {
      throw new Error('No data received from Google Analytics');
    }

    // Process and store the data
    const formattedData = response.data.rows.map(row => ({
      date: row[0],
      pageViews: parseInt(row[1]),
      sessions: parseInt(row[2]),
      bounceRate: parseFloat(row[3]),
      totalUsers: parseInt(row[4]),
      newUsers: parseInt(row[5]),
      avgEngagementTime: parseFloat(row[6]),
    }));

    await prisma.analyticsData.create({
      data: {
        date: new Date(),
        pageViews: formattedData.reduce((sum, item) => sum + item.pageViews, 0),
        users: formattedData,
        events: [],
        topPages: [],
        userAcquisition: [],
        userBehavior: [],
        topDomains: [],
        topPagesViews: [],
        worstPerformingPages: [],
      },
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching and storing Google Analytics data:', error);
    throw error;
  }
}