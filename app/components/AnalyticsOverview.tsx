import { TotalUsersChart } from './TotalUsersChart';
import { KeyMetricsSummary } from './KeyMetricsSummary';
import { log } from '@/utils/logger';

interface AnalyticsOverviewProps {
  data: {
    usersData?: {
      date: string;
      totalUsers: number;
      newUsers: number;
      avgEngagementTime: number;
      cumulativeTotalUsers: number;
    }[];
    // ... other data types
  };
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  log(`AnalyticsOverview: Received data: ${JSON.stringify(data)}`);

  if (!data.usersData || data.usersData.length === 0) {
    log('AnalyticsOverview: No usersData available');
    return <div>No data available</div>;
  }

  const sortedData = [...data.usersData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  log(`AnalyticsOverview: Sorted data: ${JSON.stringify(sortedData)}`);

  const totalUsers = sortedData[sortedData.length - 1]?.cumulativeTotalUsers;
  log(`AnalyticsOverview: Total Users: ${totalUsers}`);

  const chartData = sortedData.map(item => ({
    date: item.date,
    cumulativeTotalUsers: item.cumulativeTotalUsers
  }));

  log(`AnalyticsOverview: Chart data: ${JSON.stringify(chartData)}`);

  return (
    <div className="space-y-6">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Total Users: {totalUsers !== undefined ? totalUsers.toLocaleString() : 'N/A'}</h2>
        <TotalUsersChart data={chartData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-3">
          <KeyMetricsSummary data={data} />
        </div>
        {/* ... other components */}
      </div>
    </div>
  );
}