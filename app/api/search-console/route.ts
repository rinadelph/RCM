import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { log, logAPIRequest, logAPIResponse } from '@/utils/logger';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
	logAPIRequest('/api/search-console', 'GET');

	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			log('Error: User not authenticated');
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const serviceId = searchParams.get('serviceId');

		if (!serviceId) {
			log('Error: Missing serviceId parameter');
			return NextResponse.json({ error: 'Missing serviceId parameter' }, { status: 400 });
		}

		const service = await prisma.service.findUnique({
			where: { id: serviceId, serviceType: 'searchconsole' },
		});

		if (!service || !service.apiKey || !service.searchConsoleProperty) {
			log(`Error: Search Console service not found or incomplete for ID ${serviceId}`);
			return NextResponse.json({ error: 'Search Console service not found or incomplete' }, { status: 404 });
		}

		const apiKeyData = JSON.parse(service.apiKey);
		const oauth2Client = new google.auth.OAuth2();
		oauth2Client.setCredentials({
			refresh_token: apiKeyData.refresh_token,
		});

		const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

		// Fetch Search Console data
		const result = await searchconsole.searchanalytics.query({
			siteUrl: service.searchConsoleProperty,
			requestBody: {
				startDate: '7daysAgo',
				endDate: 'today',
				dimensions: ['query'],
				rowLimit: 10,
			},
		});

		logAPIResponse('/api/search-console', 'GET', 200);
		return NextResponse.json(result.data);
	} catch (error) {
		log(`Error fetching Search Console data: ${error}`, null, 'error');
		logAPIResponse('/api/search-console', 'GET', 500);
		return NextResponse.json({ error: 'Failed to fetch Search Console data' }, { status: 500 });
	}
}