import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WorstPerformingPagesChartProps {
  data: {
    pageTitle: string;
    views: number;
    bounceRate: number;
    avgTimeOnPage: number;
  }[];
}

const WorstPerformingPagesChart: React.FC<WorstPerformingPagesChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => {
    // Custom sorting logic: consider views, bounce rate, and avg time on page
    const aScore = a.views * (1 - a.bounceRate) * a.avgTimeOnPage;
    const bScore = b.views * (1 - b.bounceRate) * b.avgTimeOnPage;
    return aScore - bScore;
  }).slice(0, 10); // Bottom 10 pages

  const chartData = {
    labels: sortedData.map(item => item.pageTitle),
    datasets: [
      {
        label: 'Views',
        data: sortedData.map(item => item.views),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Bounce Rate',
        data: sortedData.map(item => item.bounceRate * 100), // Convert to percentage
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Avg. Time on Page (seconds)',
        data: sortedData.map(item => item.avgTimeOnPage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
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
        text: 'Worst Performing Pages',
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
      <h2 className="text-xl font-semibold mb-4">Worst Performing Pages</h2>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WorstPerformingPagesChart;