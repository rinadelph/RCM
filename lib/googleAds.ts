import { GoogleAdsApi, enums } from 'google-ads-api';
import { PrismaClient } from '@prisma/client';
import { refreshAccessToken } from '../app/api/google-auth/route';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function getGoogleAdsData(accountId: string, startDate: string, endDate: string) {
  try {
    log('Starting getGoogleAdsData function', { accountId, startDate, endDate });

    const service = await prisma.service.findUnique({
      where: { id: accountId },
      include: { credential: true },
    });

    if (!service || !service.credential) {
      throw new Error('Service or credentials not found');
    }

    log('Service found', {
      serviceId: service.id,
      hasCredential: !!service.credential,
      adsCustomerId: service.adsCustomerId,
    });

    let { accessToken, refreshToken } = service.credential;

    if (service.credential.expiryDate && new Date() > service.credential.expiryDate) {
      log('Access token expired, refreshing');
      const newToken = await refreshAccessToken(service.id);
      if (newToken) {
        accessToken = newToken;
        log('Access token refreshed successfully');
      } else {
        throw new Error('Failed to refresh access token');
      }
    }

    const oauthCredential = await prisma.oAuthCredential.findFirst();
    if (!oauthCredential) {
      throw new Error('OAuth credentials not found in database');
    }

    log('OAuth credentials found', {
      hasClientId: !!oauthCredential.clientId,
      hasClientSecret: !!oauthCredential.clientSecret,
      hasDeveloperToken: !!oauthCredential.developerToken,
    });

    if (!oauthCredential.developerToken) {
      throw new Error('Developer token is missing in OAuth credentials');
    }

    const client = new GoogleAdsApi({
      client_id: oauthCredential.clientId,
      client_secret: oauthCredential.clientSecret,
      developer_token: oauthCredential.developerToken,
    });

    log('GoogleAdsApi client created');

    if (!service.adsCustomerId) {
      throw new Error('Ads Customer ID not found for this service');
    }

    const customerId = service.adsCustomerId.replace(/-/g, '');

    const customer = client.Customer({
      customer_id: customerId,
      refresh_token: refreshToken,
      login_customer_id: customerId,
    });

    log('Customer object created', { customerId });

    log('Fetching campaign data from Google Ads API');
    try {
      const campaigns = await customer.report({
        entity: 'campaign',
        attributes: [
          'campaign.id',
          'campaign.name',
          'campaign.status',
        ],
        metrics: [
          'metrics.impressions',
          'metrics.clicks',
          'metrics.conversions',
          'metrics.cost_micros',
        ],
        constraints: {
          'campaign.status': enums.CampaignStatus.ENABLED,
        },
        date_range: {
          start_date: startDate,
          end_date: endDate,
        },
      });

      log('Campaign data fetched successfully', { campaignCount: campaigns.length });

      const processedCampaigns = campaigns.map((campaign: any) => ({
        campaignName: campaign.campaign.name,
        impressions: parseInt(campaign.metrics.impressions),
        clicks: parseInt(campaign.metrics.clicks),
        conversions: parseFloat(campaign.metrics.conversions),
        cost: parseInt(campaign.metrics.cost_micros) / 1000000,
      }));

      return { campaigns: processedCampaigns };
    } catch (reportError) {
      log('Error fetching campaign report', { error: reportError });
      throw reportError;
    }
  } catch (error) {
    log('Error in getGoogleAdsData', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
}