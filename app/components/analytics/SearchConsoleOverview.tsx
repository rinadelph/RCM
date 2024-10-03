import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { log } from '@/utils/logger';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface SearchConsoleOverviewProps {
  siteUrl: string;
  dateRange: string;
}

const SearchConsoleOverview: React.FC<SearchConsoleOverviewProps> = ({ siteUrl, dateRange }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        log('Fetching Search Console data', { siteUrl, dateRange });
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const response = await fetch(`/api/search-console?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        log('Search Console data fetched successfully', { dataLength: result.performanceData.rows?.length });
        setData(result);
      } catch (e) {
        log('Error fetching Search Console data', { error: e instanceof Error ? e.message : 'Unknown error' });
        setError('Failed to fetch Search Console data');
      }
    };

    fetchData();
  }, [siteUrl, dateRange]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const performanceData = data.performanceData;
  const sitemapsData = data.sitemapsData;

  const queryChartData = {
    labels: performanceData.rows.slice(0, 10).map((row: any) => row.keys[0]),
    datasets: [
      {
        label: 'Clicks',
        data: performanceData.rows.slice(0, 10).map((row: any) => row.clicks),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Impressions',
        data: performanceData.rows.slice(0, 10).map((row: any) => row.impressions),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top Queries',
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Search Console Overview</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Performance Data</h3>
        <Bar options={options} data={queryChartData} />
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Sitemaps</h3>
        <ul>
          {sitemapsData.sitemap.map((sitemap: any, index: number) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{sitemap.path}</span>
              <span className="ml-4 text-gray-600">Last downloaded: {new Date(sitemap.lastDownloaded).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Add more sections for other data as needed */}
    </div>
  );
};

export default SearchConsoleOverview;