'use client'

import React, { useState, useEffect } from 'react';
import { Settings, ColdEmailSettings as ColdEmailSettingsType } from '../types';

interface ColdEmailSettingsProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const ColdEmailSettings: React.FC<ColdEmailSettingsProps> = ({ settings, updateSettings }) => {
  const [coldEmailSettings, setColdEmailSettings] = useState<ColdEmailSettingsType>({
    enabled: false,
    dailyLimit: 0,
    instantlyApiKey: '',
    instantlyWorkspaceId: '',
    campaigns: [],
  });

  useEffect(() => {
    if (settings && settings.coldEmail) {
      setColdEmailSettings(settings.coldEmail);
    }
  }, [settings]);

  const handleChange = (field: keyof ColdEmailSettingsType, value: any) => {
    setColdEmailSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    updateSettings({ ...settings, coldEmail: coldEmailSettings });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cold Email Settings</h2>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={coldEmailSettings.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="mr-2"
          />
          Enable Cold Email
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Daily Limit</label>
        <input
          type="number"
          value={coldEmailSettings.dailyLimit}
          onChange={(e) => handleChange('dailyLimit', parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Instantly API Key</label>
        <input
          type="text"
          value={coldEmailSettings.instantlyApiKey}
          onChange={(e) => handleChange('instantlyApiKey', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Instantly Workspace ID</label>
        <input
          type="text"
          value={coldEmailSettings.instantlyWorkspaceId}
          onChange={(e) => handleChange('instantlyWorkspaceId', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={saveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ColdEmailSettings;