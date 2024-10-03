import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = request.headers.get('X-Instantly-API-Key');
  const workspaceId = request.headers.get('X-Instantly-Workspace');

  if (!apiKey || !workspaceId) {
    return NextResponse.json({ error: 'Missing API key or workspace ID' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.instantly.ai/api/v1/campaign/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-WORKSPACE-ID': workspaceId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch campaigns from Instantly.ai');
    }

    const data = await response.json();
    const campaigns = data.data.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
    }));

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}