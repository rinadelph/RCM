import { useEffect, useState } from 'react';

interface TrafficSourcesProps {
  timeRange: string;
}

export default function TrafficSources({ timeRange }: TrafficSourcesProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          organic: '45%',
          direct: '30%',
          referral: '15%',
          social: '10%',
        }), 500)
      );
      setData(response);
    };

    fetchData();
  }, [timeRange]);

  if (!data) return <div>Loading Traffic Sources data...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Traffic Sources</h2>
      <p>Time Range: {timeRange}</p>
      <ul>
        <li>Organic: {data.organic}</li>
        <li>Direct: {data.direct}</li>
        <li>Referral: {data.referral}</li>
        <li>Social: {data.social}</li>
      </ul>
    </div>
  );
}