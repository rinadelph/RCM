import React from 'react';
import { Settings, GoogleService } from '../types';

interface Props {
  settings: Settings;
  handleAddGoogleService: () => void;
  handleRemoveGoogleService: (id: string) => void;
  handleGoogleServiceChange: (id: string, field: keyof GoogleService, value: string) => void;
}

export function GoogleServicesSettings({ settings, handleAddGoogleService, handleRemoveGoogleService, handleGoogleServiceChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Google Services</h2>
      {settings.googleServices && settings.googleServices.map(service => (
        <div key={service.id} className="border p-4 rounded">
          <input
            type="text"
            value={service.name}
            onChange={(e) => handleGoogleServiceChange(service.id, 'name', e.target.value)}
            placeholder="Service Name"
            className="mb-2 w-full p-2 border rounded"
          />
          <select
            value={service.type}
            onChange={(e) => handleGoogleServiceChange(service.id, 'type', e.target.value as GoogleService['type'])}
            className="mb-2 w-full p-2 border rounded"
            aria-label="Select Google service type"
          >
            <option value="analytics">Analytics</option>
            <option value="searchConsole">Search Console</option>
            <option value="ads">Ads</option>
          </select>
          <textarea
            value={service.credentials}
            onChange={(e) => handleGoogleServiceChange(service.id, 'credentials', e.target.value)}
            placeholder="Paste your credentials JSON here"
            className="mb-2 w-full p-2 border rounded"
            rows={4}
          />
          <button
            onClick={() => handleRemoveGoogleService(service.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Remove Service
          </button>
        </div>
      ))}
      <button
        onClick={handleAddGoogleService}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Google Service
      </button>
    </div>
  );
}