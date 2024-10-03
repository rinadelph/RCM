import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmailDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Welcome Series', sent: 1000, opened: 450, clicked: 200 },
    { id: 2, name: 'Product Launch', sent: 5000, opened: 2000, clicked: 800 },
  ]);

  const chartData = {
    labels: ['Sent', 'Opened', 'Clicked'],
    datasets: campaigns.map((campaign) => ({
      label: campaign.name,
      data: [campaign.sent, campaign.opened, campaign.clicked],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    })),
  };

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4">Email Dashboard</h2>
      <div className="flex-grow grid grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex flex-col items-center">
            <h3 className="text-md font-medium mb-2">{campaign.name}</h3>
            <Doughnut 
              data={{
                labels: chartData.labels,
                datasets: [chartData.datasets[campaigns.indexOf(campaign)]]
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

export default EmailDashboard;