import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PageViewsChartProps {
  data: {
    date: string;
    totalUsers: number;
    newUsers: number;
    avgEngagementTime: number;
  }[];
}

const PageViewsChart: React.FC<PageViewsChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isChartHovered, setIsChartHovered] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'totalUsers' | 'newUsers' | 'avgEngagementTime'>('totalUsers');

  const metricLabels = {
    totalUsers: 'Total Users',
    newUsers: 'New Users',
    avgEngagementTime: 'Avg. Engagement Time',
  };

  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartData = {
    labels: sortedData.map(item => formatDate(item.date)),
    datasets: [
      {
        label: metricLabels[selectedMetric],
        data: sortedData.map(item => item[selectedMetric]),
        fill: true,
        backgroundColor: 'rgba(66, 133, 244, 0.2)',
        borderColor: 'rgb(66, 133, 244)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(66, 133, 244)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (context: any) => `Date: ${context[0].label}`,
          label: (context: any) => `${metricLabels[selectedMetric]}: ${formatMetricValue(context.parsed.y, selectedMetric)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7, align: 'start' as const },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: {
          maxTicksLimit: 5,
          callback: (value: number) => formatMetricValue(value, selectedMetric),
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    onHover: (_: any, elements: any[]) => {
      setHoveredIndex(elements.length > 0 ? elements[0].index : null);
    },
  };

  const calculateTotal = () => {
    if (selectedMetric === 'avgEngagementTime') {
      const totalEngagementTime = sortedData.reduce((sum, item) => sum + item.avgEngagementTime * item.totalUsers, 0);
      const totalUsers = sortedData.reduce((sum, item) => sum + item.totalUsers, 0);
      return totalUsers > 0 ? totalEngagementTime / totalUsers : 0;
    } else {
      return sortedData.reduce((sum, item) => sum + item[selectedMetric], 0);
    }
  };

  const totalValue = calculateTotal();

  const formatMetricValue = (value: number | undefined, metric: string) => {
    if (value === undefined) return 'N/A';
    if (metric === 'avgEngagementTime') {
      const seconds = Math.round(value);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
    }
    return value.toLocaleString();
  };

  const getDisplayValue = () => {
    if (isChartHovered && hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < sortedData.length) {
      return formatMetricValue(sortedData[hoveredIndex][selectedMetric], selectedMetric);
    }
    return formatMetricValue(totalValue, selectedMetric);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{metricLabels[selectedMetric]}</h2>
        <div className="flex space-x-2">
          {Object.entries(metricLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`px-2 py-1 text-sm rounded ${
                selectedMetric === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-3xl font-bold">
            {getDisplayValue()}
          </div>
          <div className="text-sm text-gray-500">
            {isChartHovered && hoveredIndex !== null ? 'On selected date' : 
              (selectedMetric === 'avgEngagementTime' ? 'Average engagement time per active user' : `Total ${metricLabels[selectedMetric].toLowerCase()}`)}
          </div>
        </div>
      </div>
      <div 
        className="h-64"
        onMouseEnter={() => setIsChartHovered(true)}
        onMouseLeave={() => setIsChartHovered(false)}
      >
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="text-right">
          <div className="font-semibold">Date range</div>
          <div>{`${formatDate(sortedData[0]?.date || '')} - ${formatDate(sortedData[sortedData.length - 1]?.date || '')}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PageViewsChart;