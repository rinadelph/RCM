'use client'

import React, { useState, useEffect } from 'react';
import { Settings, GoogleService } from '../types';

interface GoogleSettingsProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const GoogleSettings: React.FC<GoogleSettingsProps> = ({ settings, updateSettings }) => {
  console.log('Rendering GoogleSettings, settings:', settings);

  const [googleServices, setGoogleServices] = useState<GoogleService[]>([]);

  useEffect(() => {
    if (settings && settings.googleServices) {
      setGoogleServices(settings.googleServices);
    } else {
      console.log('googleServices is undefined, initializing empty array');
      setGoogleServices([]);
    }
  }, [settings]);

  const addGoogleService = () => {
    const newService: GoogleService = {
      id: Date.now().toString(),
      name: '',
      apiKey: '',
    };
    setGoogleServices([...googleServices, newService]);
  };

  const updateGoogleService = (index: number, field: keyof GoogleService, value: string) => {
    const updatedServices = googleServices.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setGoogleServices(updatedServices);
  };

  const removeGoogleService = (index: number) => {
    const updatedServices = googleServices.filter((_, i) => i !== index);
    setGoogleServices(updatedServices);
  };

  const saveChanges = () => {
    updateSettings({ ...settings, googleServices });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Google Services</h2>
      {googleServices.map((service, index) => (
        <div key={service.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={service.name}
            onChange={(e) => updateGoogleService(index, 'name', e.target.value)}
            placeholder="Service Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            value={service.apiKey}
            onChange={(e) => updateGoogleService(index, 'apiKey', e.target.value)}
            placeholder="API Key"
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={() => removeGoogleService(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addGoogleService}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Google Service
      </button>
      <button
        onClick={saveChanges}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default GoogleSettings;