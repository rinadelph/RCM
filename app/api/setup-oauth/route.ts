import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const oauthCredential = await prisma.oAuthCredential.findFirst();
    return NextResponse.json(oauthCredential);
  } catch (error) {
    log('Error fetching OAuth credentials:', error);
    return NextResponse.json({ error: 'Failed to fetch OAuth credentials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { clientId, clientSecret, redirectUri, developerToken } = await request.json();

    log('Updating OAuth credentials', { clientId, redirectUri, hasDeveloperToken: !!developerToken });

    const updatedCredential = await prisma.oAuthCredential.upsert({
      where: { id: 'default' },
      update: { 
        clientId, 
        clientSecret, 
        redirectUri, 
        developerToken: developerToken || undefined // Only update if provided
      },
      create: { 
        id: 'default', 
        clientId, 
        clientSecret, 
        redirectUri, 
        developerToken: developerToken || undefined 
      },
    });

    log('OAuth credentials updated successfully', { 
      hasClientId: !!updatedCredential.clientId,
      hasClientSecret: !!updatedCredential.clientSecret,
      hasRedirectUri: !!updatedCredential.redirectUri,
      hasDeveloperToken: !!updatedCredential.developerToken
    });

    return NextResponse.json({ message: 'OAuth credentials updated successfully' });
  } catch (error) {
    log('Error updating OAuth credentials:', error);
    return NextResponse.json({ error: 'Failed to update OAuth credentials' }, { status: 500 });
  }
}