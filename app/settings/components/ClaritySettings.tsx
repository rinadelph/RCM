'use client'

import React, { useState, useEffect } from 'react';
import { Settings, ClarityProperty } from '../types';

interface ClaritySettingsProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const ClaritySettings: React.FC<ClaritySettingsProps> = ({ settings, updateSettings }) => {
  const [clarityProperties, setClarityProperties] = useState<ClarityProperty[]>([]);

  useEffect(() => {
    if (settings && settings.clarity) {
      setClarityProperties(settings.clarity);
    } else {
      setClarityProperties([]);
    }
  }, [settings]);

  const addClarityProperty = () => {
    const newProperty: ClarityProperty = {
      id: Date.now().toString(),
      name: '',
      value: '',
    };
    setClarityProperties([...clarityProperties, newProperty]);
  };

  const updateClarityProperty = (index: number, field: keyof ClarityProperty, value: string) => {
    const updatedProperties = clarityProperties.map((property, i) =>
      i === index ? { ...property, [field]: value } : property
    );
    setClarityProperties(updatedProperties);
  };

  const removeClarityProperty = (index: number) => {
    const updatedProperties = clarityProperties.filter((_, i) => i !== index);
    setClarityProperties(updatedProperties);
  };

  const saveChanges = () => {
    updateSettings({ ...settings, clarity: clarityProperties });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Clarity Properties</h2>
      {clarityProperties.map((property, index) => (
        <div key={property.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={property.name}
            onChange={(e) => updateClarityProperty(index, 'name', e.target.value)}
            placeholder="Property Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            value={property.value}
            onChange={(e) => updateClarityProperty(index, 'value', e.target.value)}
            placeholder="Property Value"
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={() => removeClarityProperty(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addClarityProperty}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Clarity Property
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

export default ClaritySettings;