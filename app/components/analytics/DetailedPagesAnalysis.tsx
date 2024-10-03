import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PageData {
  pageTitle: string;
  views: number;
  bounceRate?: number;
  avgTimeOnPage?: number;
}

interface DetailedPagesAnalysisProps {
  topPages: PageData[];
  worstPages: PageData[];
}

const DetailedPagesAnalysis: React.FC<DetailedPagesAnalysisProps> = ({ topPages, worstPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showTopPages, setShowTopPages] = useState(true);

  const sortedData = useMemo(() => {
    if (showTopPages) {
      return [...topPages].sort((a, b) => b.views - a.views);
    } else {
      return [...worstPages].sort((a, b) => {
        const aScore = (a.views || 0) * (1 - (a.bounceRate || 0)) * (a.avgTimeOnPage || 0);
        const bScore = (b.views || 0) * (1 - (b.bounceRate || 0)) * (b.avgTimeOnPage || 0);
        return bScore - aScore; // Worst pages at the top
      });
    }
  }, [showTopPages, topPages, worstPages]);

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const chartData = {
    labels: paginatedData.map(item => item.pageTitle),
    datasets: [
      {
        label: 'Views',
        data: paginatedData.map(item => item.views),
        backgroundColor: 'rgba(26, 115, 232, 0.6)',
        borderColor: 'rgba(26, 115, 232, 1)',
        borderWidth: 1,
      },
      ...(showTopPages ? [] : [
        {
          label: 'Bounce Rate (%)',
          data: paginatedData.map(item => item.bounceRate ? item.bounceRate * 100 : 0),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Avg. Time on Page (seconds)',
          data: paginatedData.map(item => item.avgTimeOnPage || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ]),
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: showTopPages ? 'Top Performing Pages' : 'Worst Performing Pages',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Page Title',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Detailed Pages Analysis</h2>
        <div>
          <button
            onClick={() => { setShowTopPages(true); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-l ${showTopPages ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Top Pages
          </button>
          <button
            onClick={() => { setShowTopPages(false); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-r ${!showTopPages ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Worst Pages
          </button>
        </div>
      </div>
      <div style={{ height: '600px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          className="border rounded px-2 py-1"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default DetailedPagesAnalysis;