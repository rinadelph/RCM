'use client'

import { useState, useEffect } from 'react';
import AISettings from '../components/AISettings';
import { Settings } from '../types';

export default function AISettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings')
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => console.error('Error fetching settings:', error));
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSettings(newSettings);
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Settings</h1>
      <AISettings settings={settings} updateSettings={updateSettings} />
    </div>
  );
}