import { prisma } from './prisma';

// Simple in-memory cache
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchAnalyticsData(timeRange: string) {
  const cacheKey = `analytics_${timeRange}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  try {
    const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const data = await response.json();
    
    cache[cacheKey] = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error('Error in fetchAnalyticsData:', error);
    return null;
  }
}