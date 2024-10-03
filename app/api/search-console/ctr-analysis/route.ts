import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { refreshAccessToken } from '../../google-auth/route';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteUrl = searchParams.get('siteUrl');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!siteUrl || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return NextResponse.json({ error: 'Invalid date format. Please use YYYY-MM-DD.' }, { status: 400 });
  }

  try {
    const service = await prisma.service.findFirst({
      where: {
        searchConsoleProperty: siteUrl,
        type: 'GOOGLE',
        serviceType: 'searchconsole',
      },
      include: { credential: true },
    });

    if (!service || !service.credential) {
      return NextResponse.json({ error: 'Service or credentials not found' }, { status: 404 });
    }

    let { accessToken, refreshToken } = service.credential;

    if (!accessToken) {
      if (!refreshToken) {
        return NextResponse.json({ error: 'Refresh token not available', requiresAuth: true }, { status: 401 });
      }
      const newTokens = await refreshAccessToken(refreshToken);
      if (!newTokens) {
        return NextResponse.json({ error: 'Failed to refresh access token', requiresAuth: true }, { status: 401 });
      }
      accessToken = newTokens.access_token;
      refreshToken = newTokens.refresh_token || refreshToken;

      await prisma.credential.update({
        where: { id: service.credential.id },
        data: { accessToken, refreshToken },
      });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 1000,
      },
    });

    const ctrData = response.data.rows?.map((row: any) => ({
      date: row.keys[0],
      ctr: row.ctr,
      clicks: row.clicks,
      impressions: row.impressions,
    })) || [];

    return NextResponse.json(ctrData);
  } catch (error) {
    log('Error fetching CTR analysis data:', error);
    return NextResponse.json({ error: 'Failed to fetch CTR analysis data' }, { status: 500 });
  }
}