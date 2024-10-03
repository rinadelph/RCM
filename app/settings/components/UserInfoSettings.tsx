'use client'

import React from 'react';
import { Settings, UserInfo } from '../types';

export default function UserInfoSettings({ settings, updateSettings }: { settings: Settings; updateSettings: (newSettings: Settings) => void }) {
  console.log('Rendering UserInfoSettings, settings:', settings);

  if (!settings.userInfo) {
    console.log('userInfo is undefined, initializing empty object');
    settings.userInfo = {
      name: '',
      email: '',
      discordWebhook: ''
    };
  }

  const handleChange = (field: keyof UserInfo, value: string) => {
    updateSettings({
      ...settings,
      userInfo: {
        ...settings.userInfo,
        [field]: value
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Info Settings</h1>
      <div className="mb-4 p-4 border rounded">
        <input
          type="text"
          value={settings.userInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          value={settings.userInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={settings.userInfo.discordWebhook}
          onChange={(e) => handleChange('discordWebhook', e.target.value)}
          placeholder="Discord Webhook for Mobile Notifications"
          className="w-full p-2 border rounded mb-2"
        />
      </div>
    </div>
  );
}