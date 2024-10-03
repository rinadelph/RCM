import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { FaLink, FaExternalLinkAlt } from 'react-icons/fa';

interface BacklinkData {
  domain: string;
  backlinks: number;
  domainAuthority: number;
}

interface BacklinkAnalysisModuleProps {
  siteUrl: string;
}

const BacklinkAnalysisModule: React.FC<BacklinkAnalysisModuleProps> = ({ siteUrl }) => {
  const [backlinkData, setBacklinkData] = useState<BacklinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBacklinkData();
  }, [siteUrl]);

  const fetchBacklinkData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/backlink-analysis?siteUrl=${encodeURIComponent(siteUrl)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch backlink data');
      }
      const data = await response.json();
      setBacklinkData(data);
    } catch (err) {
      setError('Error fetching backlink data. Please try again.');
      console.error('Error fetching backlink data:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData<'bar'> = {
    labels: backlinkData.map(item => item.domain),
    datasets: [
      {
        label: 'Backlinks',
        data: backlinkData.map(item => item.backlinks),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Domain Authority',
        data: backlinkData.map(item => item.domainAuthority),
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
        text: 'Top Referring Domains',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading backlink data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Backlink Analysis</h2>
      <div className="mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-800"><FaLink /></span>
            <span className="text-sm font-semibold text-blue-800">Total Backlinks</span>
          </div>
          <p className="text-3xl font-bold text-blue-800">
            {backlinkData.reduce((sum, item) => sum + item.backlinks, 0)}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-800"><FaExternalLinkAlt /></span>
            <span className="text-sm font-semibold text-green-800">Unique Referring Domains</span>
          </div>
          <p className="text-3xl font-bold text-green-800">{backlinkData.length}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Backlinks
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Domain Authority
              </th>
            </tr>
          </thead>
          <tbody>
            {backlinkData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.domain}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.backlinks}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.domainAuthority}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BacklinkAnalysisModule;