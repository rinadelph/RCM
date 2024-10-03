import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';

interface TopPagesChartProps {
  data: any[]; // Replace 'any' with a more specific type if possible
}

const TopPagesChart: React.FC<TopPagesChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    console.log('TopPagesChart rendered');
    console.log('Chart.js registered elements:', Object.keys(ChartJS.registry.elements));
  }, []);

  const chartData: ChartData<'bar'> = {
    labels: data.map(item => item.pageTitle),
    datasets: [
      {
        label: 'Page Views',
        data: data.map(item => item.pageViews),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top Pages',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={options} />;
};

export default TopPagesChart;