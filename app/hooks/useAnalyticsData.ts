import { useState, useEffect } from 'react';
import { log } from '@/utils/logger';

interface AnalyticsData {
  pageViewsData: any[];
  eventsData: any[];
  userAcquisitionData: any[];
  userBehaviorData: any[];
  topPagesData: any[];
  topDomainsData: any[];
}

export const useAnalyticsData = (accountId: string | null, dateRange: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) return;

      setIsLoading(true);
      setError(null);

      try {
        log(`Fetching analytics data for account ${accountId} with date range ${dateRange}`);
        const response = await fetch(`/api/google-analytics?accountId=${accountId}&dateRange=${dateRange}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch analytics data: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        log('Analytics data fetched successfully', result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        log('Error fetching analytics data:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accountId, dateRange]);

  return { data, isLoading, error };
};