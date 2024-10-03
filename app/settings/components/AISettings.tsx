'use client'

import React, { useState, useEffect } from 'react';
import { Settings, AIService } from '../types';

interface AISettingsProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const AISettings: React.FC<AISettingsProps> = ({ settings, updateSettings }) => {
  const [aiServices, setAIServices] = useState<AIService[]>([]);

  useEffect(() => {
    if (settings && settings.aiServices) {
      setAIServices(settings.aiServices);
    } else {
      setAIServices([]);
    }
  }, [settings]);

  const addAIService = () => {
    const newService: AIService = {
      id: Date.now().toString(),
      name: '',
      type: 'openai',
      apiKey: '',
    };
    setAIServices([...aiServices, newService]);
  };

  const updateAIService = (index: number, field: keyof AIService, value: string) => {
    const updatedServices = aiServices.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setAIServices(updatedServices);
  };

  const removeAIService = (index: number) => {
    const updatedServices = aiServices.filter((_, i) => i !== index);
    setAIServices(updatedServices);
  };

  const saveChanges = () => {
    updateSettings({ ...settings, aiServices });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">AI Services</h2>
      {aiServices.map((service, index) => (
        <div key={service.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={service.name}
            onChange={(e) => updateAIService(index, 'name', e.target.value)}
            placeholder="Service Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <select
            value={service.type}
            onChange={(e) => updateAIService(index, 'type', e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
            <option value="claude">Claude</option>
            <option value="runway">Runway</option>
          </select>
          <input
            type="text"
            value={service.apiKey}
            onChange={(e) => updateAIService(index, 'apiKey', e.target.value)}
            placeholder="API Key"
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={() => removeAIService(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addAIService}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add AI Service
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

export default AISettings;