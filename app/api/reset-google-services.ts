import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function GET() {
  try {
    await prisma.googleService.deleteMany({});
    return NextResponse.json({ message: 'All Google services deleted successfully' });
  } catch (error) {
    console.error('Error deleting Google services:', error);
    return NextResponse.json({ error: 'Failed to delete Google services' }, { status: 500 });
  }
}