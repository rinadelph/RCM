'use client';

import { useState, useEffect, useCallback } from 'react';
import ModularGrid from '../components/ModularGrid';
import GoogleAnalyticsOverview from '../components/GoogleAnalyticsOverview';
import SearchConsoleOverview from '../components/SearchConsoleOverview';
import EmailOverview from '../components/EmailOverview';
import ColdEmailCampaigns from '../components/ColdEmailCampaigns';
import AutomationOverview from '../components/AutomationOverview';
import BlogGeneratorStatus from '../components/BlogGeneratorStatus';
import Link from 'next/link';

const defaultModules = [
  { id: 'googleAnalytics', component: <GoogleAnalyticsOverview />, defaultSize: { w: 6, h: 8 } },
  { id: 'searchConsole', component: <SearchConsoleOverview />, defaultSize: { w: 6, h: 8 } },
  { id: 'emailOverview', component: <EmailOverview />, defaultSize: { w: 4, h: 6 } },
  { id: 'coldEmailCampaigns', component: <ColdEmailCampaigns />, defaultSize: { w: 4, h: 6 } },
  { id: 'automationOverview', component: <AutomationOverview />, defaultSize: { w: 4, h: 6 } },
  { id: 'blogGeneratorStatus', component: <BlogGeneratorStatus />, defaultSize: { w: 6, h: 6 } },
];

export default function DashboardPage() {
  const [modules, setModules] = useState(defaultModules);
  const [dashboards, setDashboards] = useState<string[]>([]);
  const [currentDashboard, setCurrentDashboard] = useState('default');
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    console.log('DashboardPage mounted');
    if (typeof window !== 'undefined') {
      const savedDashboards = localStorage.getItem('dashboards');
      if (savedDashboards) {
        setDashboards(JSON.parse(savedDashboards));
      }
    }
    return () => console.log('DashboardPage unmounted');
  }, []);

  const handleSaveLayout = useCallback((layout: any) => {
    console.log('Saving layout for dashboard:', currentDashboard);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`dashboard_${currentDashboard}`, JSON.stringify(layout));
      if (!dashboards.includes(currentDashboard)) {
        const newDashboards = [...dashboards, currentDashboard];
        setDashboards(newDashboards);
        localStorage.setItem('dashboards', JSON.stringify(newDashboards));
      }
    }
  }, [currentDashboard, dashboards]);

  const handleLoadLayout = useCallback(() => {
    console.log('Loading layout for dashboard:', currentDashboard);
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem(`dashboard_${currentDashboard}`);
      return savedLayout ? JSON.parse(savedLayout) : null;
    }
    return null;
  }, [currentDashboard]);

  useEffect(() => {
    const loadedLayout = handleLoadLayout();
    setLayout(loadedLayout);
  }, [handleLoadLayout]);

  const handleCreateNewDashboard = useCallback(() => {
    const newDashboardName = prompt('Enter a name for the new dashboard:');
    if (newDashboardName) {
      console.log('Creating new dashboard:', newDashboardName);
      setCurrentDashboard(newDashboardName);
      setModules(defaultModules);
    }
  }, []);

  const handleChangeDashboard = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDashboard = e.target.value;
    console.log('Changing to dashboard:', newDashboard);
    setCurrentDashboard(newDashboard);
  }, []);

  console.log('Rendering DashboardPage', { currentDashboard, dashboards });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agency Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select
            value={currentDashboard}
            onChange={handleChangeDashboard}
            className="border rounded px-2 py-1"
            aria-label="Select Dashboard"
          >
            {dashboards.map((dashboard) => (
              <option key={dashboard} value={dashboard}>
                {dashboard}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreateNewDashboard}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            New Dashboard
          </button>
          <Link href="/analytics" className="bg-blue-500 text-white px-4 py-2 rounded">
            Website Analytics
          </Link>
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 100px)' }}>
        <ModularGrid
          modules={modules}
          onSaveLayout={handleSaveLayout}
          onLoadLayout={handleLoadLayout}
        />
      </div>
    </div>
  );
}