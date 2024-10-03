import React, { useState } from 'react';

interface DateRangePickerProps {
  onChange: (dateRange: { startDate: string; endDate: string }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState('7daysAgo');

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setSelectedRange(range);
    
    let startDate, endDate;
    switch (range) {
      case '7daysAgo':
        startDate = '7daysAgo';
        endDate = 'today';
        break;
      case '30daysAgo':
        startDate = '30daysAgo';
        endDate = 'today';
        break;
      case '90daysAgo':
        startDate = '90daysAgo';
        endDate = 'today';
        break;
      default:
        startDate = '7daysAgo';
        endDate = 'today';
    }

    onChange({ startDate, endDate });
  };

  return (
    <div className="mb-4">
      <label htmlFor="dateRange" className="mr-2 font-semibold">Date Range:</label>
      <select
        id="dateRange"
        value={selectedRange}
        onChange={handleRangeChange}
        className="border rounded px-2 py-1"
      >
        <option value="7daysAgo">Last 7 days</option>
        <option value="30daysAgo">Last 30 days</option>
        <option value="90daysAgo">Last 90 days</option>
      </select>
    </div>
  );
};

export default DateRangePicker;