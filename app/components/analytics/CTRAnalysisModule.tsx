import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface CTRData {
  date: string;
  ctr: number;
  clicks: number;
  impressions: number;
}

interface CTRAnalysisModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const CTRAnalysisModule: React.FC<CTRAnalysisModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [ctrData, setCTRData] = useState<CTRData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCTRData();
  }, [siteUrl, startDate, endDate]);

  const fetchCTRData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/ctr-analysis?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch CTR data');
      }
      const data = await response.json();
      setCTRData(data);
    } catch (err) {
      setError('Error fetching CTR data. Please try again.');
      console.error('Error fetching CTR data:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData<'line'> = {
    labels: ctrData.map(item => item.date),
    datasets: [
      {
        label: 'CTR',
        data: ctrData.map(item => item.ctr * 100), // Convert to percentage
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Clicks',
        data: ctrData.map(item => item.clicks),
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
        text: 'CTR Analysis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'CTR (%)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Clicks',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const calculateAverageCTR = () => {
    if (ctrData.length === 0) return 0;
    const totalCTR = ctrData.reduce((sum, item) => sum + item.ctr, 0);
    return (totalCTR / ctrData.length) * 100;
  };

  if (loading) return <div>Loading CTR analysis data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">CTR Analysis</h2>
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Average CTR</h3>
          <p className="text-3xl font-bold text-blue-800">{calculateAverageCTR().toFixed(2)}%</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold text-green-800">{ctrData.reduce((sum, item) => sum + item.clicks, 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default CTRAnalysisModule;