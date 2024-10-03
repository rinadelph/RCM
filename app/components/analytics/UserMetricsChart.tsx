import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartOptions, ChartData } from 'chart.js';

interface UserMetricsChartProps {
  data: any[]; // Replace 'any' with a more specific type if possible
}

const UserMetricsChart: React.FC<UserMetricsChartProps> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Total Users',
        data: data.map(item => item.totalUsers),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'New Users',
        data: data.map(item => item.newUsers),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Metrics',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserMetricsChart;