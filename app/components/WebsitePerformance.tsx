import { useEffect, useState } from 'react';

interface WebsitePerformanceProps {
  timeRange: string;
}

export default function WebsitePerformance({ timeRange }: WebsitePerformanceProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          loadTime: '1.5s',
          firstContentfulPaint: '0.8s',
          largestContentfulPaint: '2.1s',
        }), 500)
      );
      setData(response);
    };

    fetchData();
  }, [timeRange]);

  if (!data) return <div>Loading Website Performance data...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Website Performance</h2>
      <p>Time Range: {timeRange}</p>
      <ul>
        <li>Load Time: {data.loadTime}</li>
        <li>First Contentful Paint: {data.firstContentfulPaint}</li>
        <li>Largest Contentful Paint: {data.largestContentfulPaint}</li>
      </ul>
    </div>
  );
}