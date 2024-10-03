import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeGoogleApis, getAnalyticsData, getSearchConsoleData } from '@/lib/googleApis';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const settings = await prisma.settings.findFirst();
        if (!settings) {
            return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
        }

        const { analyticsReporting, searchConsole } = await initializeGoogleApis(settings.serviceAccountKey);

        const analyticsData = await getAnalyticsData(analyticsReporting, settings.gaViewId);
        const searchConsoleData = await getSearchConsoleData(searchConsole, settings.gscSiteUrl);

        return NextResponse.json({ analyticsData, searchConsoleData });
    } catch (error) {
        console.error('Error fetching Google data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}