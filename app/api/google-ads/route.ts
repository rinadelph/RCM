import { NextResponse } from 'next/server';
import { getGoogleAdsData } from '@/lib/googleAds';
import { log } from '@/utils/logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!accountId || !startDate || !endDate) {
    log('Missing required parameters', { accountId, startDate, endDate });
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    log('Fetching Google Ads data', { accountId, startDate, endDate });
    const adsData = await getGoogleAdsData(accountId, startDate, endDate);
    log('Fetched Google Ads data:', { dataLength: adsData.campaigns?.length });
    return NextResponse.json(adsData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : '';
    log('Error fetching Google Ads data:', { error: errorMessage, details: errorDetails });
    return NextResponse.json({ error: `Failed to fetch Google Ads data: ${errorMessage}`, details: errorDetails }, { status: 500 });
  }
}