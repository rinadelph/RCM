import { useState, useEffect } from 'react';
import { log } from '@/utils/logger';

interface Settings {
  googleAds?: {
    customerId: string;
    // Add other Google Ads related fields here
  };
  // Add other settings as needed
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    googleAds: {
      customerId: '',
      // Initialize other Google Ads fields here
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        log('Fetching settings');
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          log(`Fetched settings: ${JSON.stringify(data)}`);
          setSettings(prevSettings => ({
            ...prevSettings,
            ...data,
            googleAds: {
              ...prevSettings.googleAds,
              ...(data.googleAds || {}),
            },
          }));
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        log(`Error fetching settings: ${error}`);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    try {
      log(`Updating settings: ${JSON.stringify(newSettings)}`);
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        log(`Settings updated successfully: ${JSON.stringify(updatedSettings)}`);
        setSettings(updatedSettings);
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      log(`Error updating settings: ${error}`);
      throw error;
    }
  };

  return { settings, updateSettings };
}