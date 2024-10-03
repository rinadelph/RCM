import React, { useState, useEffect } from 'react';
import { Settings } from '../settings/types';

interface UserInfoSettingsProps {
  settings: Settings;
  onSave: (updatedSettings: Settings) => void;
}

const UserInfoSettings: React.FC<UserInfoSettingsProps> = ({ settings, onSave }) => {
  const [name, setName] = useState(settings.userInfo.name);
  const [email, setEmail] = useState(settings.userInfo.email);
  const [discordWebhook, setDiscordWebhook] = useState(settings.userInfo.discordWebhook);

  const handleSave = () => {
    const updatedSettings = {
      ...settings,
      userInfo: {
        name,
        email,
        discordWebhook,
      },
    };
    onSave(updatedSettings);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="discordWebhook" className="block text-sm font-medium text-gray-700">Discord Webhook</label>
        <input
          type="text"
          id="discordWebhook"
          value={discordWebhook}
          onChange={(e) => setDiscordWebhook(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserInfoSettings;