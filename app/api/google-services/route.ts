import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { log } from '@/utils/logger'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('User ID:', session.user.id);

    const googleServices = await prisma.googleService.findMany({
      where: { userId: session.user.id },
    });

    console.log(`Fetched ${googleServices.length} Google services:`, JSON.stringify(googleServices));
    return NextResponse.json(googleServices);
  } catch (error) {
    console.error('Error fetching Google services:', error);
    return NextResponse.json({ error: 'Failed to fetch Google services' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    log(`Creating new Google service: ${JSON.stringify(data)}`);
    const service = await prisma.googleService.create({
      data: {
        userId: session.user.id,
        serviceName: data.serviceName,
        serviceType: data.serviceType,
        gaPropertyId: data.gaPropertyId,
        gaMeasurementId: data.gaMeasurementId,
        gscSiteUrl: data.gscSiteUrl,
        adsCustomerId: data.adsCustomerId,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        isAuthenticated: false,
      },
    });
    log(`Created new Google service with ID: ${service.id}`);
    
    // Fetch all services after creating a new one
    const allServices = await prisma.googleService.findMany({
      where: { userId: session.user.id },
    });
    log(`Total Google services after creation: ${allServices.length}`);
    
    return NextResponse.json(service);
  } catch (error) {
    log(`Error creating Google service: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    log(`Updating Google service: ${JSON.stringify(data)}`);
    const service = await prisma.googleService.update({
      where: { id: data.id },
      data: {
        serviceName: data.serviceName,
        serviceType: data.serviceType,
        gaPropertyId: data.gaPropertyId,
        gaMeasurementId: data.gaMeasurementId,
        gscSiteUrl: data.gscSiteUrl,
        adsCustomerId: data.adsCustomerId,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
      },
    });
    log(`Updated Google service with ID: ${service.id}`);
    return NextResponse.json(service);
  } catch (error) {
    log(`Error updating Google service: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    log(`Deleting Google service with ID: ${id}`);
    await prisma.googleService.delete({ where: { id } });
    log(`Deleted Google service with ID: ${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    log(`Error deleting Google service: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}