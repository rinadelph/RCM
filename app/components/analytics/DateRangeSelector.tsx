import React, { useState } from 'react';

interface DateRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string, startDate?: string, endDate?: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ selectedRange, onRangeChange }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const ranges = [
    { label: '1D', value: '1daysAgo' },
    { label: '7D', value: '7daysAgo' },
    { label: '28D', value: '28daysAgo' },
    { label: '6M', value: '180daysAgo' }, // Change this line
    { label: 'Custom', value: 'custom' },
  ];

  const handleRangeClick = (value: string) => {
    if (value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      onRangeChange(value);
    }
  };

  const handleCustomDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStartDate && customEndDate) {
      onRangeChange('custom', customStartDate, customEndDate);
      setShowCustom(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => handleRangeClick(range.value)}
            className={`px-3 py-1 rounded ${
              selectedRange === range.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      {showCustom && (
        <div className="absolute top-10 right-0 mt-2 p-4 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleCustomDateSubmit}>
            <div className="flex flex-col space-y-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                Apply
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;