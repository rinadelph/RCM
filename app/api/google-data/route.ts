import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeGoogleApis, getAnalyticsData, getSearchConsoleData } from '@/lib/googleApis';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    const { serviceAccountKey, gaViewId, gscSiteUrl } = settings;
    const { analyticsReporting, searchConsole } = initializeGoogleApis(serviceAccountKey);

    const analyticsData = await getAnalyticsData(analyticsReporting, gaViewId);
    const searchConsoleData = await getSearchConsoleData(searchConsole, gscSiteUrl);

    return NextResponse.json({ analyticsData, searchConsoleData });
  } catch (error) {
    log('Error fetching Google data:', error);
    return NextResponse.json({ error: 'Failed to fetch Google data' }, { status: 500 });
  }
}