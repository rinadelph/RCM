import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    console.log(`Attempting to delete service with id: ${id}`);

    // Try to find the service in both GoogleService and Service models
    const googleService = await prisma.googleService.findUnique({ where: { id } });
    const oldService = await prisma.service.findUnique({ where: { id } });

    if (!googleService && !oldService) {
      console.log(`Service with id ${id} not found in either GoogleService or Service models`);
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    let deletedService;

    // Use a transaction to ensure all related deletions are performed atomically
    await prisma.$transaction(async (tx) => {
      if (googleService) {
        console.log(`Found GoogleService:`, googleService);
        // Delete any related records here if needed
        deletedService = await tx.googleService.delete({ where: { id } });
        console.log(`Deleted GoogleService:`, deletedService);
      } else if (oldService) {
        console.log(`Found old Service:`, oldService);
        // Delete associated credential if it exists
        await tx.credential.deleteMany({ where: { serviceId: id } });
        // Delete any other related records here
        deletedService = await tx.service.delete({ where: { id } });
        console.log(`Deleted old Service:`, deletedService);
      }
    });

    return NextResponse.json(deletedService);
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Try to update in both GoogleService and Service models
    let updatedService;
    try {
      updatedService = await prisma.googleService.update({
        where: { id },
        data,
      });
    } catch (e) {
      // If GoogleService update fails, try updating the old Service model
      updatedService = await prisma.service.update({
        where: { id },
        data,
      });
    }

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}