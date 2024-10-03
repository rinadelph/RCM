import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { developerToken } = await request.json();

    if (!developerToken) {
      return NextResponse.json({ error: 'Developer token is required' }, { status: 400 });
    }

    const updatedCredential = await prisma.oAuthCredential.upsert({
      where: { id: 'default' }, // Assuming we're using a single record for OAuth credentials
      update: { developerToken },
      create: { id: 'default', developerToken, clientId: '', clientSecret: '', redirectUri: '' },
    });

    log('OAuth credentials updated successfully');
    return NextResponse.json({ message: 'OAuth credentials updated successfully' });
  } catch (error) {
    log('Error updating OAuth credentials:', error);
    return NextResponse.json({ error: 'Failed to update OAuth credentials' }, { status: 500 });
  }
}