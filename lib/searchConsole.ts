import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { refreshAccessToken } from '../app/api/google-auth/route';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function getSearchConsoleData(siteUrl: string, startDate: string, endDate: string) {
  log('Starting getSearchConsoleData function', { siteUrl, startDate, endDate });

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
      throw new Error(`No service found for siteUrl: ${siteUrl}`);
    }

    let { accessToken, refreshToken } = service.credential;

    if (!accessToken) {
      if (!refreshToken) {
        log('No refresh token available. User needs to re-authenticate.');
        throw new Error('Authentication required. Please reconnect your Google account.');
      }
      log('Access token is missing, attempting to refresh');
      const newTokens = await refreshAccessToken(refreshToken);
      accessToken = newTokens.access_token ?? null;
      refreshToken = newTokens.refresh_token ?? refreshToken;

      // Update the database with the new tokens
      await prisma.credential.update({
        where: { id: service.credential.id },
        data: { 
          accessToken,
          refreshToken,
        },
      });
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    // Set up token refresh callback
    auth.on('tokens', async (tokens) => {
      if (tokens.refresh_token || tokens.access_token) {
        await prisma.credential.update({
          where: { id: service.credential.id },
          data: {
            refreshToken: tokens.refresh_token ?? refreshToken,
            accessToken: tokens.access_token ?? accessToken,
          },
        });
      }
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const performanceData = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
        dataState: 'all'
      },
    });

    const sitemapsData = await searchconsole.sitemaps.list({
      siteUrl,
    });

    const urlInspectionData = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: siteUrl,
        siteUrl,
        languageCode: 'en-US'
      },
    });

    return {
      performanceData: performanceData.data,
      sitemapsData: sitemapsData.data,
      urlInspectionData: urlInspectionData.data,
    };
  } catch (error) {
    log('Error in getSearchConsoleData', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
}