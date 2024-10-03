import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoogleAnalyticsOverview: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('All Properties');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const properties = ['All Properties', 'Property 1', 'Property 2', 'Property 3'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Sessions',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Google Analytics Overview</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedProperty} 
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Property"
          >
            {properties.map(prop => (
              <option key={prop} value={prop}>{prop}</option>
            ))}
          </select>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Date Range"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow">
        <Line 
          data={data} 
          options={{ 
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              title: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} 
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-100 p-3 rounded">
          <h3 className="text-sm font-semibold mb-1">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-green-100 p-3 rounded">
          <h3 className="text-sm font-semibold mb-1">Avg. Session Duration</h3>
          <p className="text-2xl font-bold">2m 15s</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalyticsOverview;