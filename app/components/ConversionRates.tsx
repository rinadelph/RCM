import { useEffect, useState } from 'react';

interface ConversionRatesProps {
  timeRange: string;
}

export default function ConversionRates({ timeRange }: ConversionRatesProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          overallConversionRate: '2.5%',
          leadGenerationRate: '3.2%',
          ecommerceConversionRate: '1.8%',
        }), 500)
      );
      setData(response);
    };

    fetchData();
  }, [timeRange]);

  if (!data) return <div>Loading Conversion Rates data...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Conversion Rates</h2>
      <p>Time Range: {timeRange}</p>
      <ul>
        <li>Overall Conversion Rate: {data.overallConversionRate}</li>
        <li>Lead Generation Rate: {data.leadGenerationRate}</li>
        <li>E-commerce Conversion Rate: {data.ecommerceConversionRate}</li>
      </ul>
    </div>
  );
}