import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';

interface TopDomainsChartProps {
  data: any[]; // Replace 'any' with a more specific type if possible
}

const TopDomainsChart: React.FC<TopDomainsChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    console.log('TopDomainsChart rendered');
    console.log('Chart.js registered elements:', Object.keys(ChartJS.registry.elements));
  }, []);

  const chartData: ChartData<'doughnut'> = {
    labels: data.map(item => item.domain),
    datasets: [
      {
        data: data.map(item => item.sessions),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top Domains',
      },
    },
  };

  return <Doughnut ref={chartRef} data={chartData} options={options} />;
};

export default TopDomainsChart;