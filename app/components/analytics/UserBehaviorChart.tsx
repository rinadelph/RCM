import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';

interface UserBehaviorChartProps {
  data: any[]; // Replace 'any' with a more specific type if possible
}

const UserBehaviorChart: React.FC<UserBehaviorChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    console.log('UserBehaviorChart rendered');
    console.log('Chart.js registered elements:', Object.keys(ChartJS.registry.elements));
  }, []);

  const chartData: ChartData<'bar'> = {
    labels: data.map(item => item.metric),
    datasets: [
      {
        label: 'User Behavior',
        data: data.map(item => item.value),
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
        text: 'User Behavior',
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={options} />;
};

export default UserBehaviorChart;