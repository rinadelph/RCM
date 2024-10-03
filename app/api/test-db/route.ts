import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}