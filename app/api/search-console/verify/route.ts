import { NextResponse } from 'next/server';
import { getSearchConsoleData } from '@/lib/searchConsole';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteUrl = searchParams.get('siteUrl');

  if (!siteUrl) {
    return NextResponse.json({ error: 'Site URL is required' }, { status: 400 });
  }

  try {
    // Attempt to fetch basic data
    const data = await getSearchConsoleData(siteUrl, '7daysAgo', 'today');
    return NextResponse.json({ verified: true, data });
  } catch (error) {
    console.error('Error verifying Search Console access:', error);
    return NextResponse.json({ verified: false, error: 'Failed to verify Search Console access' }, { status: 500 });
  }
}