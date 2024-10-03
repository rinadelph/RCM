import { NextResponse } from 'next/server';
import { log } from '@/utils/logger';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import { refreshAccessToken } from '../../google-auth/route';

const prisma = new PrismaClient();
const analyticsData = google.analyticsdata('v1beta');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');

  if (!accountId) {
    log('Error: Account ID is required');
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id: accountId },
      include: { credential: true },
    });

    if (!service || !service.credential) {
      log(`Error: Service or credentials not found for ID ${accountId}`);
      return NextResponse.json({ error: 'Service or credentials not found' }, { status: 404 });
    }

    const { gaPropertyId } = service;
    let { accessToken, refreshToken } = service.credential;

    if (!gaPropertyId || !accessToken || !refreshToken) {
      log(`Error: Missing required credentials`);
      return NextResponse.json({ error: 'Missing required credentials' }, { status: 400 });
    }

    if (service.credential.expiryDate && new Date() > service.credential.expiryDate) {
      log('Access token expired, refreshing...');
      try {
        accessToken = await refreshAccessToken(service.id);
      } catch (refreshError) {
        log(`Error refreshing token: ${refreshError}`);
        return NextResponse.json({ error: 'Failed to refresh access token' }, { status: 500 });
      }
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

    const realTimeData = await analyticsData.properties.runRealtimeReport({
      property: `properties/${gaPropertyId}`,
      requestBody: {
        dimensions: [{ name: 'unifiedScreenName' }],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
        minuteRanges: [{ name: 'realtime', startMinutesAgo: 30, endMinutesAgo: 0 }],
      },
      auth: auth,
    });

    const formattedData = formatRealTimeData(realTimeData.data);
    return NextResponse.json(formattedData);
  } catch (error) {
    log(`Error fetching real-time Google Analytics data: ${error}`);
    return NextResponse.json({ error: 'Failed to fetch real-time analytics data' }, { status: 500 });
  }
}

function formatRealTimeData(data: any) {
  if (!data || !data.rows || data.rows.length === 0) {
    log('Invalid or empty real-time data received');
    return { activeUsers: 0, pageViews: 0, topPages: [] };
  }

  const activeUsers = data.totals[0].metricValues[0].value;
  const pageViews = data.totals[0].metricValues[1].value;
  const topPages = data.rows.map((row: any) => ({
    pagePath: row.dimensionValues[0].value,
    activeUsers: parseInt(row.metricValues[0].value, 10),
    pageViews: parseInt(row.metricValues[1].value, 10),
  })).sort((a: any, b: any) => b.activeUsers - a.activeUsers).slice(0, 5);

  return { activeUsers, pageViews, topPages };
}