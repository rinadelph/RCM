'use client';

import { useState, useEffect } from 'react';
import { Settings } from '../types';
import BlogSettings from '../components/BlogSettings';

export default function BlogGeneratorSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error('Error fetching settings:', error));
  }, []);

  const handleSave = async (updatedSettings: Settings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSettings(updatedSettings);
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
      <h1 className="text-2xl font-bold mb-4">Blog Generator Settings</h1>
      <BlogSettings settings={settings} onSave={handleSave} />
    </div>
  );
}