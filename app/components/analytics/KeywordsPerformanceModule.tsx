import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface KeywordData {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface KeywordsPerformanceModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const KeywordsPerformanceModule: React.FC<KeywordsPerformanceModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof KeywordData>('clicks');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchKeywordData();
  }, [siteUrl, startDate, endDate]);

  const fetchKeywordData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/keywords?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch keyword data');
      }
      const data = await response.json();
      setKeywordData(data);
    } catch (err) {
      setError('Error fetching keyword data. Please try again.');
      console.error('Error fetching keyword data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: keyof KeywordData) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...keywordData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const chartData: ChartData<'line'> = {
    labels: sortedData.map(item => item.keyword),
    datasets: [
      {
        label: 'Clicks',
        data: sortedData.map(item => item.clicks),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Impressions',
        data: sortedData.map(item => item.impressions),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Keyword Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading keyword data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Keyword Performance</h2>
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {['keyword', 'clicks', 'impressions', 'ctr', 'position'].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column as keyof KeywordData)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === column ? (
                    sortDirection === 'asc' ? (
                      <FaSortUp className="inline ml-1" />
                    ) : (
                      <FaSortDown className="inline ml-1" />
                    )
                  ) : (
                    <FaSort className="inline ml-1" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.keyword}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.clicks}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.impressions}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{(item.ctr * 100).toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.position.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordsPerformanceModule;