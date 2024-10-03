import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSearch, FaMousePointer, FaPercent, FaChartLine } from 'react-icons/fa';

interface OrganicTrafficData {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface OrganicTrafficModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const OrganicTrafficModule: React.FC<OrganicTrafficModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [trafficData, setTrafficData] = useState<OrganicTrafficData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrganicTrafficData();
  }, [siteUrl, startDate, endDate]);

  const fetchOrganicTrafficData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/organic-traffic?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch organic traffic data');
      }
      const data = await response.json();
      setTrafficData(data);
    } catch (err) {
      setError('Error fetching organic traffic data. Please try again.');
      console.error('Error fetching organic traffic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData<'line'> = {
    labels: trafficData.map(item => item.date),
    datasets: [
      {
        label: 'Clicks',
        data: trafficData.map(item => item.clicks),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Impressions',
        data: trafficData.map(item => item.impressions),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Organic Traffic Overview',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Clicks',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Impressions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const calculateChange = (metric: 'clicks' | 'impressions' | 'ctr' | 'position') => {
    if (trafficData.length < 2) return 0;
    const oldValue = trafficData[0][metric];
    const newValue = trafficData[trafficData.length - 1][metric];
    return ((newValue - oldValue) / oldValue) * 100;
  };

  if (loading) return <div>Loading organic traffic data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Organic Traffic Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-800"><FaMousePointer /></span>
            <span className="text-sm font-semibold text-blue-800">Clicks</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 mt-2">{trafficData[trafficData.length - 1]?.clicks}</p>
          <p className={`text-sm ${calculateChange('clicks') >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange('clicks').toFixed(2)}% vs. previous period
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-green-800"><FaSearch /></span>
            <span className="text-sm font-semibold text-green-800">Impressions</span>
          </div>
          <p className="text-2xl font-bold text-green-800 mt-2">{trafficData[trafficData.length - 1]?.impressions}</p>
          <p className={`text-sm ${calculateChange('impressions') >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange('impressions').toFixed(2)}% vs. previous period
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-yellow-800"><FaPercent /></span>
            <span className="text-sm font-semibold text-yellow-800">CTR</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800 mt-2">{(trafficData[trafficData.length - 1]?.ctr * 100).toFixed(2)}%</p>
          <p className={`text-sm ${calculateChange('ctr') >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange('ctr').toFixed(2)}% vs. previous period
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-purple-800"><FaChartLine /></span>
            <span className="text-sm font-semibold text-purple-800">Avg. Position</span>
          </div>
          <p className="text-2xl font-bold text-purple-800 mt-2">{trafficData[trafficData.length - 1]?.position.toFixed(1)}</p>
          <p className={`text-sm ${calculateChange('position') <= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(calculateChange('position')).toFixed(2)}% {calculateChange('position') <= 0 ? 'improvement' : 'decline'}
          </p>
        </div>
      </div>
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OrganicTrafficModule;