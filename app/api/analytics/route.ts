import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateRange = searchParams.get('dateRange') || '30d';

  try {
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

    const response = await analytics.data.ga.get({
      auth,
      ids: 'ga:' + googleService.gaPropertyId,
      'start-date': dateRange === '7d' ? '7daysAgo' : dateRange === '90d' ? '90daysAgo' : '30daysAgo',
      'end-date': 'today',
      metrics: 'ga:users,ga:newUsers,ga:pageviews,ga:sessions,ga:bounceRate,ga:avgTimeOnPage',
      dimensions: 'ga:date',
    });

    const formattedData = response.data.rows?.map(row => ({
      date: row[0],
      totalUsers: parseInt(row[1]),
      newUsers: parseInt(row[2]),
      pageViews: parseInt(row[3]),
      sessions: parseInt(row[4]),
      bounceRate: parseFloat(row[5]),
      avgEngagementTime: parseFloat(row[6]),
    })) || [];

    // Store the fetched data in the database
    await prisma.analyticsData.upsert({
      where: {
        date: new Date(),
      },
      update: {
        pageViews: formattedData.reduce((sum, item) => sum + item.pageViews, 0),
        users: formattedData,
        events: [], // Add actual events data when available
        topPages: [], // Add actual top pages data when available
        userAcquisition: [], // Add actual user acquisition data when available
        userBehavior: [], // Add actual user behavior data when available
        topDomains: [], // Add actual top domains data when available
        topPagesViews: [], // Add actual top pages views data when available
        worstPerformingPages: [], // Add actual worst performing pages data when available
      },
      create: {
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

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}