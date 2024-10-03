import React, { useEffect, useState } from 'react';

interface GoogleAnalyticsData {
  timeRange: string;
  sessions: string;
  users: string;
  pageviews: string;
  bounceRate: string;
}

interface GoogleAnalyticsDetailProps {
  accountId: string;
}

const GoogleAnalyticsDetail: React.FC<GoogleAnalyticsDetailProps> = ({ accountId }) => {
  const [data, setData] = useState<GoogleAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) return;

      try {
        const response = await fetch(`/api/google-analytics?accountId=${accountId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error('Error fetching Google Analytics data:', error);
        setError(`Failed to fetch Google Analytics data: ${error.message}`);
      }
    };

    fetchData();
  }, [accountId]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading Google Analytics data...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Google Analytics Overview</h2>
      <p>Time Range: {data.timeRange}</p>
      <ul>
        <li>Sessions: {data.sessions}</li>
        <li>Users: {data.users}</li>
        <li>Pageviews: {data.pageviews}</li>
        <li>Bounce Rate: {data.bounceRate}%</li>
      </ul>
    </div>
  );
};

export default GoogleAnalyticsDetail;