import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { getOAuthCredentials } from '@/utils/getOAuthCredentials';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');
  const serviceType = searchParams.get('serviceType');

  if (!serviceId || !serviceType) {
    return NextResponse.json({ error: 'Missing serviceId or serviceType' }, { status: 400 });
  }

  let service;
  try {
    // Try to find the service in GoogleService model
    service = await prisma.googleService.findUnique({ where: { id: serviceId } });
    
    // If not found, try to find in the old Service model
    if (!service) {
      service = await prisma.service.findUnique({ where: { id: serviceId } });
    }

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const { clientId, clientSecret, redirectUri } = await getOAuthCredentials();

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    const scopes = getScopes(serviceType);

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: serviceId,
      prompt: 'consent'
    });

    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 });
  }
}

function getScopes(serviceType: string): string[] {
  switch (serviceType) {
    case 'analytics':
      return ['https://www.googleapis.com/auth/analytics.readonly'];
    case 'searchConsole':
      return ['https://www.googleapis.com/auth/webmasters.readonly'];
    case 'ads':
      return ['https://www.googleapis.com/auth/adwords'];
    default:
      return [];
  }
}