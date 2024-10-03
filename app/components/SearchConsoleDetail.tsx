import React, { useEffect, useState } from 'react';

interface SearchConsoleData {
  timeRange: string;
  clicks: number;
  impressions: number;
  avgPosition: number;
}

interface SearchConsoleDetailProps {
  accountId: string;
}

const SearchConsoleDetail: React.FC<SearchConsoleDetailProps> = ({ accountId }) => {
  const [data, setData] = useState<SearchConsoleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) return;

      try {
        const response = await fetch(`/api/search-console?accountId=${accountId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching Search Console data:', error);
      }
    };

    fetchData();
  }, [accountId]);

  if (!data) return <div>Loading Search Console data...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Search Console Overview</h2>
      <p>Time Range: {data.timeRange}</p>
      <ul>
        <li>Clicks: {data.clicks}</li>
        <li>Impressions: {data.impressions}</li>
        <li>Avg. Position: {data.avgPosition}</li>
      </ul>
    </div>
  );
};

export default SearchConsoleDetail;