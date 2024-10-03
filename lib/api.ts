import { Service } from '@/types/service'; // Adjust the import path as needed

export async function getGoogleServices(): Promise<Service[]> {
  try {
    const response = await fetch('/api/google-services');
    if (!response.ok) {
      throw new Error('Failed to fetch Google services');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Google services:', error);
    return [];
  }
}