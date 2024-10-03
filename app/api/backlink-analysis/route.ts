import { NextResponse } from 'next/server';
import { log } from '@/utils/logger';

// This is a mock function. In a real-world scenario, you'd integrate with a backlink API here.
async function fetchBacklinkDataFromAPI(siteUrl: string) {
  // Simulating API call
  return [
    { domain: 'example.com', backlinks: 1000, domainAuthority: 60 },
    { domain: 'another-site.com', backlinks: 750, domainAuthority: 55 },
    { domain: 'tech-blog.net', backlinks: 500, domainAuthority: 50 },
    { domain: 'news-portal.org', backlinks: 250, domainAuthority: 45 },
    { domain: 'social-media.com', backlinks: 100, domainAuthority: 70 },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteUrl = searchParams.get('siteUrl');

  if (!siteUrl) {
    return NextResponse.json({ error: 'Missing required parameter: siteUrl' }, { status: 400 });
  }

  try {
    const backlinkData = await fetchBacklinkDataFromAPI(siteUrl);
    return NextResponse.json(backlinkData);
  } catch (error) {
    log('Error fetching backlink data:', error);
    return NextResponse.json({ error: 'Failed to fetch backlink data' }, { status: 500 });
  }
}