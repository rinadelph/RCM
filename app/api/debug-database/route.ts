import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function GET() {
  log('GET request received in debug-database route');
  try {
    const services = await prisma.service.findMany();
    const credentials = await prisma.credential.findMany();
    // Add other models as necessary

    log('Database contents:', { services, credentials });
    return NextResponse.json({ services, credentials });
  } catch (error: unknown) {
    log('Error fetching database contents:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to fetch database contents' }, { status: 500 });
  }
}