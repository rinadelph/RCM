import React from 'react';
import { log } from '@/utils/logger';

interface UserMetricsProps {
  data: {
    usersData: Array<{
      date: string;
      totalUsers: number;
      newUsers: number;
      avgEngagementTime: number;
      cumulativeTotalUsers: number;
    }>;
  };
}

const UserMetrics: React.FC<UserMetricsProps> = ({ data }) => {
  log(`UserMetrics: Received data: ${JSON.stringify(data)}`);

  if (!data.usersData || data.usersData.length === 0) {
    log('UserMetrics: No usersData available');
    return <div>No user data available</div>;
  }

  const latestData = data.usersData[data.usersData.length - 1];
  const totalUsers = latestData.cumulativeTotalUsers;
  const newUsers = data.usersData.reduce((sum, item) => sum + item.newUsers, 0);
  const avgEngagementTime = data.usersData.reduce((sum, item) => sum + item.avgEngagementTime, 0) / data.usersData.length;

  log(`UserMetrics: Calculated metrics: ${JSON.stringify({ totalUsers, newUsers, avgEngagementTime })}`);

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
        <p className="text-3xl font-bold">{formatNumber(totalUsers)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">New Users</h3>
        <p className="text-3xl font-bold">{formatNumber(newUsers)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Avg. Engagement Time</h3>
        <p className="text-3xl font-bold">{formatTime(avgEngagementTime)}</p>
      </div>
    </div>
  );
};

export default UserMetrics;