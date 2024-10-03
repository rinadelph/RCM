import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ColdEmailCampaigns: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const campaigns = ['All Campaigns', 'New Service Promotion', 'Follow-up Campaign'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const [campaignData, setCampaignData] = useState([
    { id: 1, name: 'New Service Promotion', sent: 1000, opened: 450, replied: 50 },
    { id: 2, name: 'Follow-up Campaign', sent: 500, opened: 200, replied: 30 },
  ]);

  const chartData = {
    labels: ['Sent', 'Opened', 'Replied'],
    datasets: campaignData.map((campaign) => ({
      label: campaign.name,
      data: [campaign.sent, campaign.opened, campaign.replied],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
    })),
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Cold Email Campaigns (Instantly)</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedCampaign} 
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Campaign"
          >
            {campaigns.map(campaign => (
              <option key={campaign} value={campaign}>{campaign}</option>
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
      <div className="flex-grow grid grid-cols-2 gap-4">
        {campaignData.map((campaign) => (
          <div key={campaign.id} className="flex flex-col items-center">
            <h3 className="text-md font-medium mb-2">{campaign.name}</h3>
            <Doughnut 
              data={{
                labels: chartData.labels,
                datasets: [chartData.datasets[campaignData.indexOf(campaign)]]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColdEmailCampaigns;