'use client'

import GeneralSettings from '../components/GeneralSettings';
import { useSettings } from '../contexts/SettingsContext';

export default function GeneralSettingsPage() {
  const { settings, updateSettings } = useSettings();

  console.log('Rendering GeneralSettingsPage, settings:', settings);

  if (!settings) {
    return <div>Loading...</div>;
  }

  return <GeneralSettings settings={settings} updateSettings={updateSettings} />;
}