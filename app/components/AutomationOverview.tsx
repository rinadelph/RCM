import React, { useState } from 'react';

const AutomationOverview: React.FC = () => {
  const [selectedAutomation, setSelectedAutomation] = useState('All Automations');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const automations = ['All Automations', 'Lead Nurturing', 'Social Media Posting'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const [automationData, setAutomationData] = useState([
    { id: 1, name: 'Lead Nurturing', status: 'Active', lastRun: '2023-04-15 10:30 AM', runsToday: 15 },
    { id: 2, name: 'Social Media Posting', status: 'Active', lastRun: '2023-04-15 09:00 AM', runsToday: 8 },
  ]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Automation Overview (Make.com)</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedAutomation} 
            onChange={(e) => setSelectedAutomation(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Automation"
          >
            {automations.map(automation => (
              <option key={automation} value={automation}>{automation}</option>
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
      <div className="flex-grow overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Last Run</th>
              <th className="px-2 py-1 text-left">Runs Today</th>
            </tr>
          </thead>
          <tbody>
            {automationData.map(automation => (
              <tr key={automation.id}>
                <td className="border px-2 py-1">{automation.name}</td>
                <td className="border px-2 py-1">{automation.status}</td>
                <td className="border px-2 py-1">{automation.lastRun}</td>
                <td className="border px-2 py-1">{automation.runsToday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomationOverview;