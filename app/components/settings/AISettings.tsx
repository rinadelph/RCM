'use client'

import { useState } from 'react';

export default function AISettings() {
  const [aiModel, setAiModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting AI settings:', { aiModel });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="aiModel" className="block text-sm font-medium text-gray-700">AI Model</label>
        <select
          id="aiModel"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select an AI model</option>
          <option value="gpt-3">GPT-3</option>
          <option value="gpt-4">GPT-4</option>
          <option value="custom">Custom Model</option>
        </select>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Save AI Settings
      </button>
    </form>
  );
}