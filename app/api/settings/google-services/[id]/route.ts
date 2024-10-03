import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    console.log(`Updating Google service with id ${params.id}:`, data);
    const service = await prisma.googleService.update({
      where: { id: params.id },
      data,
    });
    console.log('Updated service:', service);
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating Google service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`Deleting Google service with id ${params.id}`);
    await prisma.googleService.delete({
      where: { id: params.id },
    });
    console.log('Service deleted successfully');
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting Google service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}