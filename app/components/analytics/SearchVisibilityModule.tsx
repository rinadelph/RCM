import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSearch, FaEye } from 'react-icons/fa';

interface VisibilityData {
  date: string;
  position: number;
  impressions: number;
}

interface SearchVisibilityModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const SearchVisibilityModule: React.FC<SearchVisibilityModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [visibilityData, setVisibilityData] = useState<VisibilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVisibilityData();
  }, [siteUrl, startDate, endDate]);

  const fetchVisibilityData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/search-visibility?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search visibility data');
      }
      const data = await response.json();
      setVisibilityData(data);
    } catch (err) {
      setError('Error fetching search visibility data. Please try again.');
      console.error('Error fetching search visibility data:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData<'line'> = {
    labels: visibilityData.map(item => item.date),
    datasets: [
      {
        label: 'Average Position',
        data: visibilityData.map(item => item.position),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Impressions',
        data: visibilityData.map(item => item.impressions),
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
        text: 'Search Visibility Analysis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Average Position',
        },
        reverse: true,
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

  const calculateAveragePosition = () => {
    if (visibilityData.length === 0) return 0;
    const totalPosition = visibilityData.reduce((sum, item) => sum + item.position, 0);
    return totalPosition / visibilityData.length;
  };

  const calculateTotalImpressions = () => {
    return visibilityData.reduce((sum, item) => sum + item.impressions, 0);
  };

  if (loading) return <div>Loading search visibility data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Search Visibility Analysis</h2>
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Average Position</h3>
            <FaSearch className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-800">{calculateAveragePosition().toFixed(2)}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Total Impressions</h3>
            <FaEye className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-800">{calculateTotalImpressions().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchVisibilityModule;