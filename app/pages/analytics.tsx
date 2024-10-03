import React, { useState } from 'react';
import PageViewsChart from '../components/analytics/PageViewsChart';
import EventsChart from '../components/analytics/EventsChart';
import TopPagesChart from '../components/analytics/TopPagesChart';
import UserAcquisitionChart from '../components/analytics/UserAcquisitionChart';
import UserBehaviorChart from '../components/analytics/UserBehaviorChart';
import TopDomainsChart from '../components/analytics/TopDomainsChart';
import TopPagesViewsChart from '../components/analytics/TopPagesViewsChart';
import WorstPerformingPagesChart from '../components/analytics/WorstPerformingPagesChart';
import { log } from '@/utils/logger';
import ModularGrid from '../components/ModularGrid';

interface AnalyticsPageProps {
  data: {
    pageViewsData: Array<{ date: string; pageViews: number }>;
    eventsData: Array<{ eventName: string; eventCount: number }>;
    topPagesData: Array<{
      pagePath: string;
      pageTitle: string;
      pageViews: number;
      avgTimeOnPage: number;
      bounceRate: number;
      conversions: number;
    }>;
    usersData: Array<{
      date: string;
      totalUsers: number;
      newUsers: number;
      avgEngagementTime: number;
      cumulativeTotalUsers: number;
    }>;
    userAcquisitionData: Array<{ channel: string; newUsers: number }>;
    userBehaviorData: Array<{ metric: string; value: number }>;
    topDomainsData: Array<{ domain: string; sessions: number }>;
    topPagesViewsData: Array<{ pageTitle: string; views: number }>;
    worstPerformingPagesData: Array<{
      pageTitle: string;
      views: number;
      bounceRate: number;
      avgTimeOnPage: number;
    }>;
  };
}

interface ErrorProps {
  error: string;
}

type PageProps = { data: AnalyticsPageProps['data'] } | ErrorProps;

export default function AnalyticsPage(props: PageProps) {
  if ('error' in props) {
    log(`AnalyticsPage Error: ${props.error}`);
    return <div>Error: {props.error}</div>;
  }

  const { data } = props;
  const [hiddenModules, setHiddenModules] = useState<string[]>([]);

  log(`AnalyticsPage: Rendering with data: ${JSON.stringify(data)}`);

  const modules = [
    { id: 'pageViews', component: <PageViewsChart data={data.pageViewsData} />, defaultSize: { w: 6, h: 8 } },
    { id: 'events', component: <EventsChart data={data.eventsData} />, defaultSize: { w: 6, h: 8 } },
    { id: 'topPages', component: <TopPagesChart data={data.topPagesData} />, defaultSize: { w: 12, h: 8 } },
    { id: 'userAcquisition', component: <UserAcquisitionChart data={data.userAcquisitionData} />, defaultSize: { w: 6, h: 8 } },
    { id: 'userBehavior', component: <UserBehaviorChart data={data.userBehaviorData} />, defaultSize: { w: 6, h: 8 } },
    { id: 'topDomains', component: <TopDomainsChart data={data.topDomainsData} />, defaultSize: { w: 12, h: 8 } },
    { id: 'topPagesViews', component: <TopPagesViewsChart data={data.topPagesViewsData} />, defaultSize: { w: 6, h: 8 } },
    { id: 'worstPerformingPages', component: <WorstPerformingPagesChart data={data.worstPerformingPagesData} />, defaultSize: { w: 6, h: 8 } },
  ];

  const handleSaveLayout = (layout: any) => {
    // Save the layout to local storage or send it to the server
    console.log('Saving layout:', layout);
  };

  const handleLoadLayout = () => {
    // Load the layout from local storage or fetch it from the server
    console.log('Loading layout');
    return null;
  };

  const toggleModuleVisibility = (moduleId: string) => {
    setHiddenModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const showAllModules = () => {
    setHiddenModules([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={showAllModules}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Show All Modules
        </button>
        {modules.map(module => (
          <label key={module.id} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={!hiddenModules.includes(module.id)}
              onChange={() => toggleModuleVisibility(module.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{module.id}</span>
          </label>
        ))}
      </div>
      <ModularGrid
        modules={modules}
        onSaveLayout={handleSaveLayout}
        onLoadLayout={handleLoadLayout}
        hiddenModules={hiddenModules}
      />
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: PageProps }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    log(`AnalyticsPage getServerSideProps: Fetched data: ${JSON.stringify(data)}`);
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return { props: { error: 'Failed to load analytics data' } };
  }
}