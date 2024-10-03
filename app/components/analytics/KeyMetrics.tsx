import React from 'react';
import { FaEye, FaBolt, FaChartLine, FaUser, FaUserPlus, FaFile } from 'react-icons/fa';
import { formatNumber, formatPercentage } from '../../utils/formatters';

interface KeyMetricsProps {
  pageViewsData?: { date: string; pageViews: number }[];
  eventsData?: { eventName: string; eventCount: number }[];
  topPagesData?: { pagePath: string; pageTitle: string; pageViews: number }[];
  usersData?: { date: string; totalUsers: number; newUsers: number }[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ pageViewsData, eventsData, topPagesData, usersData }) => {
  const totalPageViews = pageViewsData?.reduce((sum, item) => sum + item.pageViews, 0) || 0;
  const totalEvents = eventsData?.reduce((sum, item) => sum + item.eventCount, 0) || 0;
  const avgDailyPageViews = pageViewsData && pageViewsData.length > 0 
    ? Math.round(totalPageViews / pageViewsData.length) 
    : 0;
  
  const totalUsers = usersData && usersData.length > 0 
    ? usersData[usersData.length - 1].totalUsers 
    : 0;

  const topPage = topPagesData && topPagesData.length > 0 
    ? topPagesData[0] 
    : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Page Views</p>
          <p className="text-2xl font-bold">{totalPageViews.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-2xl font-bold">{totalEvents.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Daily Page Views</p>
          <p className="text-2xl font-bold">{avgDailyPageViews.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
        </div>
        {topPage && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Top Page</p>
            <p className="text-lg font-semibold">{topPage.pageTitle}</p>
            <p className="text-sm text-gray-500">{topPage.pageViews.toLocaleString()} views</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyMetrics;