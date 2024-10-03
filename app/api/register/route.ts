import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { log } from '@/utils/logger';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      log('Registration failed: Username already exists', { username }, 'warn');
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    log('User registered successfully', { userId: user.id }, 'info');
    return NextResponse.json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    log('Registration error', { error }, 'error');
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}