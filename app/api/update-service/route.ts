import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { log } from '@/utils/logger';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { type, name, searchConsoleProperty, adsCustomerId, propertyId, accessToken, refreshToken } = await request.json();

    log('Updating service:', { type, name, searchConsoleProperty, adsCustomerId, propertyId });

    let updatedService;

    if (type === 'SEARCH_CONSOLE') {
      updatedService = await prisma.service.upsert({
        where: {
          type_searchConsoleProperty: {
            type: 'SEARCH_CONSOLE',
            searchConsoleProperty: searchConsoleProperty,
          },
        },
        update: {
          name,
          searchConsoleProperty,
        },
        create: {
          type: 'SEARCH_CONSOLE',
          name,
          serviceType: 'SEARCH_CONSOLE',
          searchConsoleProperty,
        },
      });
    } else {
      updatedService = await prisma.service.update({
        where: { id: propertyId },
        data: {
          name,
          adsCustomerId,
          propertyId,
          credential: {
            update: {
              accessToken,
              refreshToken,
            },
          },
        },
        include: {
          credential: true,
        },
      });
    }

    log('Service updated successfully:', {
      id: updatedService.id,
      name: updatedService.name,
      type: updatedService.type,
      searchConsoleProperty: updatedService.searchConsoleProperty,
      adsCustomerId: updatedService.adsCustomerId,
      propertyId: updatedService.propertyId,
      hasAccessToken: !!updatedService.credential?.accessToken,
      hasRefreshToken: !!updatedService.credential?.refreshToken,
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    log('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}