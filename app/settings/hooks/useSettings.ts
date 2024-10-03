import { useState, useEffect } from 'react';
import { Settings } from '../types';

// Remove the apiKey and language properties from blogGenerator
const defaultSettings: Settings = {
  general: {
    companyName: '',
    emailAddress: ''
  },
  blogGenerator: {
    webhooks: []
  },
  googleServices: [],
  clarity: [],
  emailServices: {
    instantly: { apiKey: '', workspaceId: '' },
    accounts: []
  },
  aiServices: []
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => {
        console.error('Error fetching settings:', error);
        setSettings(defaultSettings);
      });
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    })
      .then(response => response.json())
      .then(data => console.log('Settings saved:', data))
      .catch(error => console.error('Error saving settings:', error));
  };

  return { settings, updateSettings };
}