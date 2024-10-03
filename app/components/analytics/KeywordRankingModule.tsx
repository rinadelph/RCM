import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface KeywordRankingData {
  keyword: string;
  position: number;
  positionChange: number;
  clicks: number;
  impressions: number;
}

interface KeywordRankingModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const KeywordRankingModule: React.FC<KeywordRankingModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [keywordData, setKeywordData] = useState<KeywordRankingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKeywordRankingData();
  }, [siteUrl, startDate, endDate]);

  const fetchKeywordRankingData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/keyword-ranking?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch keyword ranking data');
      }
      const data = await response.json();
      setKeywordData(data);
    } catch (err) {
      setError('Error fetching keyword ranking data. Please try again.');
      console.error('Error fetching keyword ranking data:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData<'line'> = {
    labels: keywordData.map(item => item.keyword),
    datasets: [
      {
        label: 'Position',
        data: keywordData.map(item => item.position),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Clicks',
        data: keywordData.map(item => item.clicks),
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
        text: 'Top Keyword Rankings',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Position',
        },
        reverse: true,
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

  if (loading) return <div>Loading keyword ranking data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Keyword Ranking Analysis</h2>
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Impressions
              </th>
            </tr>
          </thead>
          <tbody>
            {keywordData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.keyword}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.position.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={item.positionChange > 0 ? 'text-green-500' : 'text-red-500'}>
                    {item.positionChange > 0 ? <FaArrowUp className="inline mr-1" /> : <FaArrowDown className="inline mr-1" />}
                    {Math.abs(item.positionChange).toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.clicks}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.impressions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordRankingModule;