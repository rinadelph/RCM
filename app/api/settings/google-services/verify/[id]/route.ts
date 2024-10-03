import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { log } from '@/utils/logger';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  log(`[Verification] Starting verification process for service ID: ${params.id}`);
  try {
    log(`[Verification] Fetching service details from database`);
    const service = await prisma.googleService.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      log(`[Verification] Service not found for ID: ${params.id}`);
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    log(`[Verification] Service found: ${JSON.stringify(service, null, 2)}`);

    let auth;
    try {
      log(`[Verification] Attempting to create JWT`);
      let key = service.apiKey;
      try {
        log(`[Verification] Parsing API key as JSON`);
        const keyObject = JSON.parse(service.apiKey);
        key = keyObject.private_key;
        log(`[Verification] Successfully parsed API key JSON`);
      } catch (e) {
        log(`[Verification] API key is not in JSON format, using as-is`);
      }

      auth = new JWT({
        email: service.serviceName,
        key: key,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      });
      log(`[Verification] JWT created successfully`);
    } catch (error) {
      log(`[Verification] Error creating JWT: ${error}`);
      return NextResponse.json({ error: `Invalid credentials: ${error.message}. Please check the API key format.` }, { status: 400 });
    }

    let status = 'Verified';

    switch (service.serviceType) {
      case 'analytics':
        log('[Verification] Verifying Google Analytics');
        try {
          const analyticsData = google.analyticsdata({ version: 'v1beta', auth });
          log('[Verification] Calling Google Analytics Data API');
          const analyticsResult = await analyticsData.properties.runReport({
            property: `properties/${service.gaPropertyId}`,
            requestBody: {
              dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
              metrics: [{ name: 'activeUsers' }],
            },
          });
          log(`[Verification] Google Analytics API response: ${JSON.stringify(analyticsResult.data, null, 2)}`);
        } catch (error) {
          log(`[Verification] Error verifying Google Analytics: ${error}`);
          status = `Analytics verification failed: ${error.message}`;
        }
        break;
      case 'searchConsole':
        log('[Verification] Verifying Search Console');
        try {
          const searchConsole = google.searchconsole({ version: 'v1', auth });
          log('[Verification] Calling Search Console API');
          const searchConsoleResult = await searchConsole.sites.list();
          log(`[Verification] Search Console API response: ${JSON.stringify(searchConsoleResult.data, null, 2)}`);
        } catch (error) {
          log(`[Verification] Error verifying Search Console: ${error}`);
          status = `Search Console verification failed: ${error.message}`;
        }
        break;
      case 'adwords':
        log('[Verification] AdWords verification not implemented');
        status = 'AdWords verification not implemented';
        break;
      default:
        log(`[Verification] Unknown service type: ${service.serviceType}`);
        status = 'Unknown service type';
    }

    log(`[Verification] Verification completed. Status: ${status}`);
    return NextResponse.json({ status });
  } catch (error) {
    log(`[Verification] Error verifying Google service: ${error}`);
    let errorMessage = 'Verification failed';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}