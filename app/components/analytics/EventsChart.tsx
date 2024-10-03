import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EventData {
  eventName: string;
  eventCount: number;
}

interface EventsChartProps {
  data: EventData[];
}

const EventsChart: React.FC<EventsChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    console.log('EventsChart rendered');
    console.log('Chart.js registered elements:', Object.keys(ChartJS.registry.elements));
  }, []);

  const chartData: ChartData<'doughnut'> = {
    labels: data.map(item => item.eventName),
    datasets: [
      {
        data: data.map(item => item.eventCount),
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
        text: 'Events Distribution',
      },
    },
  };

  return (
    <div>
      <canvas id={`events-chart-${Math.random()}`}></canvas>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default EventsChart;