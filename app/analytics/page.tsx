'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { log } from '@/utils/logger';
import GoogleAccountSelector from '../components/GoogleAccountSelector';
import DateRangeSelector from '../components/DateRangeSelector';
import SideMenu from '../components/SideMenu';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useToast } from "../components/ui/use-toast";
import ToastDisplay from '../components/ToastDisplay';

// Placeholder components (to be implemented later)
const PageViewsChart = ({ data }: { data: any }) => <div>Page Views Chart: {JSON.stringify(data)}</div>;
const EventsChart = ({ data }: { data: any }) => <div>Events Chart: {JSON.stringify(data)}</div>;
const UserAcquisitionChart = ({ data }: { data: any }) => <div>User Acquisition Chart: {JSON.stringify(data)}</div>;
const UserBehaviorChart = ({ data }: { data: any }) => <div>User Behavior Chart: {JSON.stringify(data)}</div>;
const TopPagesChart = ({ data }: { data: any }) => <div>Top Pages Chart: {JSON.stringify(data)}</div>;
const TopDomainsChart = ({ data }: { data: any }) => <div>Top Domains Chart: {JSON.stringify(data)}</div>;

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('7d');
  const { toast, toasts } = useToast();

  const {
    data: analyticsData,
    isLoading,
    error
  } = useAnalyticsData(selectedAccountId, dateRange);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive",
      });
      log(`Error loading analytics data: ${error}`);
    }
  }, [error, toast]);

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
    log(`Selected account ID: ${accountId}`);
  };

  const handleDateRangeChange = (newDateRange: string) => {
    setDateRange(newDateRange);
    log(`Selected date range: ${newDateRange}`);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view analytics.</div>;
  }

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-1 p-10">
        <ToastDisplay />
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="mb-6">
          <GoogleAccountSelector onSelect={handleAccountSelect} />
        </div>

        <div className="mb-6">
          <DateRangeSelector value={dateRange} onChange={handleDateRangeChange} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : analyticsData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PageViewsChart data={analyticsData.pageViewsData} />
            <EventsChart data={analyticsData.eventsData} />
            <UserAcquisitionChart data={analyticsData.userAcquisitionData} />
            <UserBehaviorChart data={analyticsData.userBehaviorData} />
            <TopPagesChart data={analyticsData.topPagesData} />
            <TopDomainsChart data={analyticsData.topDomainsData} />
          </div>
        ) : (
          <div>No analytics data available. Please select an account and date range.</div>
        )}
      </div>
    </div>
  );
}