import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TopPagesViewsChartProps {
  data: Array<{ pageTitle: string; views: number }>;
}

const TopPagesViewsChart: React.FC<TopPagesViewsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.pageTitle),
    datasets: [
      {
        data: data.map(item => item.views),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Top Pages by Views',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default TopPagesViewsChart;