'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '../types';

const SettingsContext = createContext<{
  settings: Settings | null;
  updateSettings: (newSettings: Settings) => void;
  saveSettings: () => Promise<void>;
  isSaving: boolean;
}>({
  settings: null,
  updateSettings: () => {},
  saveSettings: async () => {},
  isSaving: false,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('Fetching settings...');
    fetch('/api/settings')
      .then(response => response.json())
      .then(data => {
        console.log('Settings fetched:', data);
        setSettings(data);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        // Set default settings here if needed
      });
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const saveSettings = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      console.log('Settings saved:', data);
      // You could add a toast notification here to inform the user
    } catch (error) {
      console.error('Error saving settings:', error);
      // You could add an error notification here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings, isSaving }}>
      {children}
    </SettingsContext.Provider>
  );
};