import React from 'react';
import DateRangePicker from '@/app/components/DateRangePicker';

interface AnalyticsHeaderProps {
  onDateRangeChange: (dateRange: { startDate: string; endDate: string }) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ onDateRangeChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <DateRangePicker onChange={onDateRangeChange} />
    </div>
  );
};

export default AnalyticsHeader;