import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const updatedAnalytics = await prisma.analytics.create({
      data: {
        date: new Date(),
        pageViews: data.pageViews,
        events: data.events,
        topPages: data.topPages,
        users: data.users,
        userAcquisition: data.userAcquisition,
        userBehavior: data.userBehavior,
        topDomains: data.topDomains,
        topPagesViews: data.topPagesViews,
        worstPerformingPages: data.worstPerformingPages,
      },
    });

    return NextResponse.json(updatedAnalytics);
  } catch (error) {
    console.error('Error updating analytics data:', error);
    return NextResponse.json({ error: 'Failed to update analytics data' }, { status: 500 });
  }
}