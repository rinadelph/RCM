'use client'

import { useState } from 'react';

export default function IntegrationSettings() {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [searchConsoleUrl, setSearchConsoleUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting integration settings:', { googleAnalyticsId, searchConsoleUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700">Google Analytics ID</label>
        <input
          type="text"
          id="googleAnalyticsId"
          value={googleAnalyticsId}
          onChange={(e) => setGoogleAnalyticsId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="searchConsoleUrl" className="block text-sm font-medium text-gray-700">Search Console URL</label>
        <input
          type="text"
          id="searchConsoleUrl"
          value={searchConsoleUrl}
          onChange={(e) => setSearchConsoleUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Save Integrations
      </button>
    </form>
  );
}