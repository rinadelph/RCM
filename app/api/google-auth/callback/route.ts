import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { log } from '@/utils/logger';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const state = searchParams.get('state');

	if (!code || !state) {
		log('Error: Missing code or state parameter');
		return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
	}

	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			log('Error: User not authenticated');
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		const oauthCredential = await prisma.oAuthCredential.findFirst();
		if (!oauthCredential) {
			log('Error: OAuth credentials not found');
			return NextResponse.json({ error: 'OAuth credentials not found' }, { status: 500 });
		}

		const oauth2Client = new google.auth.OAuth2(
			oauthCredential.clientId,
			oauthCredential.clientSecret,
			oauthCredential.redirectUri
		);

		const { tokens } = await oauth2Client.getToken(code);
		log('Received tokens from Google', { tokens: JSON.stringify(tokens) });

		const service = await prisma.service.findUnique({ where: { id: state } });
		if (!service) {
			log(`Error: Service not found for ID ${state}`);
			return NextResponse.json({ error: 'Service not found' }, { status: 404 });
		}

		// Update the service with the new tokens
		await prisma.service.update({
			where: { id: state },
			data: {
				apiKey: JSON.stringify({
					type: 'authorized_user',
					client_id: oauthCredential.clientId,
					client_secret: oauthCredential.clientSecret,
					refresh_token: tokens.refresh_token,
				}),
			},
		});

		log(`Tokens stored successfully for service: ${service.name} (${service.id})`);
		
		return NextResponse.redirect('/settings?auth=success');
	} catch (error) {
		log(`Error in Google Auth callback: ${error}`);
		return NextResponse.json({ error: 'Failed to authenticate with Google' }, { status: 500 });
	}
}