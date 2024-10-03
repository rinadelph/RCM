import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SearchConsoleOverview: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('All Properties');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const properties = ['All Properties', 'Property 1', 'Property 2', 'Property 3'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const data = {
    labels: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
    datasets: [
      {
        label: 'Clicks',
        data: [1000, 800, 600, 400, 200],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Impressions',
        data: [5000, 4000, 3000, 2000, 1000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Search Console Overview</h2>
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
        <Bar 
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
        <div className="bg-purple-100 p-3 rounded">
          <h3 className="text-sm font-semibold mb-1">Total Clicks</h3>
          <p className="text-2xl font-bold">3,000</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded">
          <h3 className="text-sm font-semibold mb-1">Avg. CTR</h3>
          <p className="text-2xl font-bold">2.5%</p>
        </div>
      </div>
    </div>
  );
};

export default SearchConsoleOverview;