import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { getOAuthCredentials } from '@/utils/getOAuthCredentials';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // This is the serviceId we passed earlier

  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
  }

  try {
    const { clientId, clientSecret, redirectUri } = await getOAuthCredentials();

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Try to find the service in both GoogleService and Service models
    let service = await prisma.googleService.findUnique({ where: { id: state } });
    let isGoogleService = true;

    if (!service) {
      service = await prisma.service.findUnique({ where: { id: state } });
      isGoogleService = false;
    }

    if (!service) {
      throw new Error('Service not found');
    }

    // Update the service with the new tokens
    if (isGoogleService) {
      await prisma.googleService.update({
        where: { id: state },
        data: {
          isAuthenticated: true,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || undefined,
          clientId: service.clientId || clientId,
          clientSecret: service.clientSecret || clientSecret,
        },
      });
    } else {
      await prisma.service.update({
        where: { id: state },
        data: {
          hasCredentials: true,
          verified: true,
          apiKey: tokens.access_token,
          apiSecret: tokens.refresh_token,
        },
      });
    }

    // Verify the credentials based on the service type
    let verificationResult = false;
    switch (service.serviceType) {
      case 'analytics':
        verificationResult = await verifyAnalyticsCredentials(oauth2Client);
        break;
      case 'searchConsole':
        verificationResult = await verifySearchConsoleCredentials(oauth2Client);
        break;
      case 'ads':
        verificationResult = await verifyAdsCredentials(oauth2Client);
        break;
      default:
        throw new Error('Unknown service type');
    }

    if (!verificationResult) {
      // If verification fails, update the service to reflect this
      if (isGoogleService) {
        await prisma.googleService.update({
          where: { id: state },
          data: { isAuthenticated: false },
        });
      } else {
        await prisma.service.update({
          where: { id: state },
          data: { verified: false },
        });
      }
      throw new Error('Failed to verify credentials');
    }

    // Redirect back to the settings page using an absolute URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/settings?auth=success`);
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/settings?auth=error`);
  }
}

async function verifyAnalyticsCredentials(auth: any) {
  const analytics = google.analytics('v3');
  try {
    await analytics.management.accounts.list({ auth });
    return true;
  } catch (error) {
    console.error('Error verifying Analytics credentials:', error);
    return false;
  }
}

async function verifySearchConsoleCredentials(auth: any) {
  const searchconsole = google.searchconsole('v1');
  try {
    await searchconsole.sites.list({ auth });
    return true;
  } catch (error) {
    console.error('Error verifying Search Console credentials:', error);
    return false;
  }
}

async function verifyAdsCredentials(auth: any) {
  // Note: Google Ads API requires additional setup and a developer token
  // This is a placeholder and may need to be adjusted based on your Ads API setup
  const ads = google.ads({ version: 'v14', auth });
  try {
    // Replace with an actual Ads API call
    // await ads.customers.list({});
    return true;
  } catch (error) {
    console.error('Error verifying Ads credentials:', error);
    return false;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const { clientId, clientSecret, redirectUri } = await getOAuthCredentials();
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}