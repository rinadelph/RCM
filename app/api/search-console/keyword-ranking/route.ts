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

    const currentPeriodResponse = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - 7);
    const previousEndDate = new Date(endDate);
    previousEndDate.setDate(previousEndDate.getDate() - 7);

    const previousPeriodResponse = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: previousStartDate.toISOString().split('T')[0],
        endDate: previousEndDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 1000,
      },
    });

    const currentPeriodData = currentPeriodResponse.data.rows || [];
    const previousPeriodData = previousPeriodResponse.data.rows || [];

    const keywordRankingData = currentPeriodData.map((currentRow: any) => {
      const previousRow = previousPeriodData.find((row: any) => row.keys[0] === currentRow.keys[0]);
      const positionChange = previousRow ? previousRow.position - currentRow.position : 0;

      return {
        keyword: currentRow.keys[0],
        position: currentRow.position,
        positionChange: positionChange,
        clicks: currentRow.clicks,
        impressions: currentRow.impressions,
      };
    });

    return NextResponse.json(keywordRankingData);
  } catch (error) {
    log('Error fetching keyword ranking data:', error);
    return NextResponse.json({ error: 'Failed to fetch keyword ranking data' }, { status: 500 });
  }
}