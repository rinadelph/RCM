import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { log } from '@/utils/logger';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GoogleAdsOverviewProps {
  accountId: string;
  dateRange: string;
}

const GoogleAdsOverview: React.FC<GoogleAdsOverviewProps> = ({ accountId, dateRange }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        log('Fetching Google Ads data', { accountId, dateRange });
        const endDate = new Date().toISOString().split('T')[0]; // Today's date
        const startDate = new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const response = await fetch(`/api/google-ads?accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        log('Google Ads data fetched successfully', { dataLength: result.campaigns?.length });
        setData(result);
      } catch (e) {
        log('Error fetching Google Ads data', { error: e instanceof Error ? e.message : 'Unknown error' });
        setError('Failed to fetch Google Ads data');
      }
    };

    fetchData();
  }, [accountId, dateRange]);

  // ... rest of the component remains the same
};

export default GoogleAdsOverview;