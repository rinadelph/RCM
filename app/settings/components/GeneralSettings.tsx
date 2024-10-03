'use client'

import React from 'react';
import { Settings } from '../types';

export default function GeneralSettings({ settings, updateSettings }: { settings: Settings; updateSettings: (newSettings: Settings) => void }) {
  console.log('Rendering GeneralSettings, settings:', settings);

  if (!settings.userInfo) {
    return <div>Loading...</div>;
  }

  // Add general settings fields here
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>
      {/* Add general settings fields */}
    </div>
  );
}