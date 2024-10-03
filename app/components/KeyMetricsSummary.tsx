import React from 'react';
import { log } from '@/utils/logger';

interface KeyMetricsSummaryProps {
  data: {
    usersData?: {
      date: string;
      totalUsers: number;
      newUsers: number;
      avgEngagementTime: number;
      cumulativeTotalUsers: number;
    }[];
  };
}

export function KeyMetricsSummary({ data }: KeyMetricsSummaryProps) {
  log(`KeyMetricsSummary: Received data: ${JSON.stringify(data)}`);

  if (!data.usersData || data.usersData.length === 0) {
    log('KeyMetricsSummary: No usersData available');
    return <div>No data available</div>;
  }

  const latestData = data.usersData[data.usersData.length - 1];
  log(`KeyMetricsSummary: Latest data: ${JSON.stringify(latestData)}`);

  const totalUsers = latestData.cumulativeTotalUsers;
  const newUsers = latestData.newUsers;
  const avgEngagementTime = latestData.avgEngagementTime;

  log(`KeyMetricsSummary: Calculated metrics: ${JSON.stringify({ totalUsers, newUsers, avgEngagementTime })}`);

  const formatNumber = (num: number): string => {
    if (isNaN(num)) {
      log(`KeyMetricsSummary: Invalid number: ${num}`);
      return 'N/A';
    }
    return num.toLocaleString();
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) {
      log(`KeyMetricsSummary: Invalid time: ${seconds}`);
      return 'N/A';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
        <p className="text-3xl font-bold">{formatNumber(totalUsers)}</p>
        <p className="text-sm text-gray-500">Cumulative total users</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">New Users</h3>
        <p className="text-3xl font-bold">{formatNumber(newUsers)}</p>
        <p className="text-sm text-gray-500">New users today</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Avg. Engagement Time</h3>
        <p className="text-3xl font-bold">{formatTime(avgEngagementTime)}</p>
        <p className="text-sm text-gray-500">Average time spent per session</p>
      </div>
    </div>
  );
}