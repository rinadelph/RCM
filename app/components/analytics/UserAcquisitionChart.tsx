import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';

interface UserAcquisitionChartProps {
  data: any[]; // Replace 'any' with a more specific type if possible
}

const UserAcquisitionChart: React.FC<UserAcquisitionChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    console.log('UserAcquisitionChart rendered');
    console.log('Chart.js registered elements:', Object.keys(ChartJS.registry.elements));
  }, []);

  const chartData: ChartData<'pie'> = {
    labels: data.map(item => item.channel),
    datasets: [
      {
        data: data.map(item => item.newUsers),
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

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Acquisition',
      },
    },
  };

  return <Pie ref={chartRef} data={chartData} options={options} />;
};

export default UserAcquisitionChart;