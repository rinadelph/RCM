'use client'

import UserInfoSettings from '../components/UserInfoSettings';
import { useSettings } from '../contexts/SettingsContext';

export default function UserInfoSettingsPage() {
  const { settings, updateSettings } = useSettings();

  console.log('Rendering UserInfoSettingsPage, settings:', settings);

  if (!settings) {
    console.log('Settings is null, rendering loading state');
    return <div>Loading...</div>;
  }

  console.log('UserInfo:', settings.userInfo);

  return <UserInfoSettings settings={settings} updateSettings={updateSettings} />;
}