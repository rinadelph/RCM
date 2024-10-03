import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { log } from '@/utils/logger'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	log(`Verification request received for service id: ${id}`);

	try {
		// Fetch the service details
		const service = await prisma.service.findUnique({
			where: { id },
		});

		if (!service) {
			return NextResponse.json({ error: 'Service not found' }, { status: 404 });
		}

		const { gaMeasurementId, apiSecret } = service;

		if (!gaMeasurementId || !apiSecret) {
			return NextResponse.json({ error: 'Missing required credentials' }, { status: 400 });
		}

		// Construct the verification request
		const url = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${gaMeasurementId}&api_secret=${apiSecret}`;
		const payload = {
			client_id: "test_client_id",
			events: [{
				name: "test_event",
				params: {
					debug_mode: "true"
				}
			}]
		};

		log(`Sending verification request to: ${url}`);
		log(`Payload: ${JSON.stringify(payload)}`);

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		const responseText = await response.text();
		log(`Verification response status: ${response.status}`);
		log(`Verification response body: ${responseText}`);

		if (!response.ok) {
			throw new Error(`Verification failed: ${response.statusText}`);
		}

		const responseData = JSON.parse(responseText);

		if (responseData.validationMessages && responseData.validationMessages.length > 0) {
			return NextResponse.json({ 
				verified: false, 
				message: `Validation error: ${responseData.validationMessages[0].description}` 
			});
		}

		// Update the service as verified
		// Note: We're not updating the 'verified' field as it doesn't exist in the schema
		await prisma.service.update({
			where: { id },
			data: { 
				updatedAt: new Date() // Just update the updatedAt field to mark it as verified
			},
		});

		return NextResponse.json({ 
			verified: true, 
			message: 'Service verified successfully' 
		});

	} catch (error) {
		log(`Error during verification: ${error}`);
		return NextResponse.json({ 
			verified: false, 
			message: `Verification failed: ${(error as Error).message}` 
		}, { status: 500 });
	}
}