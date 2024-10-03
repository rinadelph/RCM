'use client'

import { useState } from 'react';

export default function BlogGeneratorSettings() {
  const [blogTopics, setBlogTopics] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Blog Generator settings:', { blogTopics });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="blogTopics" className="block text-sm font-medium text-gray-700">Blog Topics (comma-separated)</label>
        <input
          type="text"
          id="blogTopics"
          value={blogTopics}
          onChange={(e) => setBlogTopics(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Save Blog Generator Settings
      </button>
    </form>
  );
}