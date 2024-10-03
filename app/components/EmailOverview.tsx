import React, { useState } from 'react';

const EmailOverview: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const accounts = ['All Accounts', 'Account 1', 'Account 2', 'Account 3'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const [emails, setEmails] = useState([
    { id: 1, subject: 'New Client Inquiry', from: 'client@example.com', date: '2023-04-15' },
    { id: 2, subject: 'Project Update', from: 'team@example.com', date: '2023-04-14' },
    { id: 3, subject: 'Invoice #1234', from: 'billing@example.com', date: '2023-04-13' },
  ]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Email Overview</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedAccount} 
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Email Account"
          >
            {accounts.map(account => (
              <option key={account} value={account}>{account}</option>
            ))}
          </select>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Date Range"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Subject</th>
              <th className="px-2 py-1 text-left">From</th>
              <th className="px-2 py-1 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map(email => (
              <tr key={email.id}>
                <td className="border px-2 py-1">{email.subject}</td>
                <td className="border px-2 py-1">{email.from}</td>
                <td className="border px-2 py-1">{email.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailOverview;