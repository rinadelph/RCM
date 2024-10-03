import React from 'react';

interface UserData {
  date: string;
  newUsers: number;
  totalUsers: number;
  engagedSessions: number;
  engagementDuration: number;
}

interface UserMetricsOverviewProps {
  data: {
    usersData?: UserData[];
  };
}

const UserMetricsOverview: React.FC<UserMetricsOverviewProps> = ({ data }) => {
  if (!data.usersData || !Array.isArray(data.usersData) || data.usersData.length === 0) {
    return <div>No user data available</div>;
  }

  const sortedData = [...data.usersData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalNewUsers = sortedData.reduce((sum, item) => sum + item.newUsers, 0);
  const totalUsers = sortedData[sortedData.length - 1]?.totalUsers || 0;
  const averageEngagementTime = sortedData.reduce((sum, item) => sum + item.engagementDuration, 0) / sortedData.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">User Metrics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">New Users</p>
          <p className="text-2xl font-bold">{totalNewUsers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Engagement Time</p>
          <p className="text-2xl font-bold">{averageEngagementTime.toFixed(2)} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default UserMetricsOverview;