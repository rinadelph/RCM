import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Service } from '@/types/service';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        type: 'GOOGLE',
      },
      select: {
        id: true,
        name: true,
        type: true,
        serviceType: true,
        gaMeasurementId: true,
        gaPropertyId: true,
        adsCustomerId: true,
        searchConsoleProperty: true,
        credential: {
          select: {
            accessToken: true,
            refreshToken: true,
          },
        },
      },
    });

    const typedServices: Service[] = services.map(service => ({
      ...service,
      type: 'GOOGLE' as const,
      serviceType: service.serviceType as Service['serviceType'],
      verified: !!service.credential?.accessToken && !!service.credential?.refreshToken,
    }));

    return NextResponse.json(typedServices);
  } catch (error) {
    console.error('Error fetching Google accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch Google accounts' }, { status: 500 });
  }
}