import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { log } from '@/utils/logger';

export async function GET() {
  try {
    log('Fetching all Google services');
    const services = await prisma.googleService.findMany();
    log(`Found ${services.length} services`);
    return NextResponse.json(services);
  } catch (error) {
    log(`Error fetching Google services: ${error}`);
    console.error('Error fetching Google services:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    log(`Creating new Google service: ${JSON.stringify(data)}`);
    const service = await prisma.googleService.create({ data });
    log(`Created service: ${JSON.stringify(service)}`);
    return NextResponse.json(service);
  } catch (error) {
    log(`Error creating Google service: ${error}`);
    console.error('Error creating Google service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}