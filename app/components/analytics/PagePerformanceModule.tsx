import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface PageData {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PagePerformanceModuleProps {
  siteUrl: string;
  startDate: string;
  endDate: string;
}

const PagePerformanceModule: React.FC<PagePerformanceModuleProps> = ({ siteUrl, startDate, endDate }) => {
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof PageData>('clicks');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchPageData();
  }, [siteUrl, startDate, endDate]);

  const fetchPageData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-console/page-performance?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch page performance data');
      }
      const data = await response.json();
      setPageData(data);
    } catch (err) {
      setError('Error fetching page performance data. Please try again.');
      console.error('Error fetching page performance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: keyof PageData) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...pageData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const chartData: ChartData<'bar'> = {
    labels: sortedData.slice(0, 10).map(item => item.page),
    datasets: [
      {
        label: 'Clicks',
        data: sortedData.slice(0, 10).map(item => item.clicks),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Impressions',
        data: sortedData.slice(0, 10).map(item => item.impressions),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top 10 Pages Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading page performance data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Page Performance</h2>
      <div className="mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {['page', 'clicks', 'impressions', 'ctr', 'position'].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column as keyof PageData)}
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
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.page}</td>
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

export default PagePerformanceModule;