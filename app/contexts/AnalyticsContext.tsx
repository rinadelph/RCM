import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnalyticsData {
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
}

interface AnalyticsContextType {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  dateRange: string;
  setDateRange: (range: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics?dateRange=${dateRange}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const fetchedData: AnalyticsData = await res.json();
        setData(fetchedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [dateRange]);

  return (
    <AnalyticsContext.Provider value={{ data, loading, error, dateRange, setDateRange }}>
      {children}
    </AnalyticsContext.Provider>
  );
};