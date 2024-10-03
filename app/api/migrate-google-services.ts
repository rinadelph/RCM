import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function GET() {
  try {
    const oldServices = await prisma.googleService.findMany();
    
    for (const service of oldServices) {
      await prisma.googleService.update({
        where: { id: service.id },
        data: {
          gaMeasurementId: service.type === 'analytics' ? service.apiKey : null,
          gaPropertyId: service.type === 'analytics' ? service.apiKey : null,
          gscSiteUrl: service.type === 'searchConsole' ? service.apiKey : null,
          adwordsClientId: service.type === 'adwords' ? service.apiKey : null,
        },
      });
    }

    return NextResponse.json({ message: 'Migration completed successfully' });
  } catch (error) {
    console.error('Error migrating Google services:', error);
    return NextResponse.json({ error: 'Failed to migrate Google services' }, { status: 500 });
  }
}