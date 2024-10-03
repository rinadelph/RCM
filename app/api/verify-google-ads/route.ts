import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { log } from '@/utils/logger';

export async function POST(request: Request) {
  const { customerID, developerToken } = await request.json();

  if (!customerID || !developerToken) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Initialize the Google Ads API client
    const adsClient = new google.ads.googleads({
      version: 'v11',
      auth: new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/adwords'],
      }),
      developerToken: developerToken,
    });

    // Attempt to make a simple API call to verify credentials
    await adsClient.customers.get({
      customerId: customerID,
    });

    return NextResponse.json({ message: 'Google Ads credentials verified successfully' });
  } catch (error) {
    log(`Error verifying Google Ads credentials: ${error}`);
    return NextResponse.json({ error: 'Failed to verify Google Ads credentials' }, { status: 400 });
  }
}