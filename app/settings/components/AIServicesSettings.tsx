import React from 'react';
import { Settings, AIService } from '../types';

interface Props {
  settings: Settings;
  handleAddAIService: () => void;
  handleRemoveAIService: (id: string) => void;
  handleAIServiceChange: (id: string, field: keyof AIService, value: string) => void;
}

export function AIServicesSettings({
  settings,
  handleAddAIService,
  handleRemoveAIService,
  handleAIServiceChange
}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Services</h2>
      {settings.aiServices.map(service => (
        <div key={service.id} className="border p-4 rounded">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              type="text"
              value={service.name}
              onChange={(e) => handleAIServiceChange(service.id, 'name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Service Type</label>
            <select
              value={service.type}
              onChange={(e) => handleAIServiceChange(service.id, 'type', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="openai">OpenAI</option>
              <option value="gemini">Gemini</option>
              <option value="claude">Claude</option>
              <option value="runway">Runway</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="text"
              value={service.apiKey}
              onChange={(e) => handleAIServiceChange(service.id, 'apiKey', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={() => handleRemoveAIService(service.id)}
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove Service
          </button>
        </div>
      ))}
      <button
        onClick={handleAddAIService}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add AI Service
      </button>
    </div>
  );
}