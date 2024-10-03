import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOAuthCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth credentials not found in environment variables');
  }

  return { clientId, clientSecret, redirectUri };
}