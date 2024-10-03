'use client'

import React from 'react';
import { Settings, BlogGeneratorWebhook } from '../types';

export default function BlogGeneratorSettings({ settings, updateSettings }: { settings: Settings; updateSettings: (newSettings: Settings) => void }) {
  if (!settings.blogGenerator) {
    settings.blogGenerator = { webhooks: [] };
  }

  const addWebhook = () => {
    const newWebhook: BlogGeneratorWebhook = {
      id: Date.now().toString(),
      name: '',
      webhook: ''
    };
    updateSettings({
      ...settings,
      blogGenerator: {
        ...settings.blogGenerator,
        webhooks: [...settings.blogGenerator.webhooks, newWebhook]
      }
    });
  };

  const updateWebhook = (id: string, field: keyof BlogGeneratorWebhook, value: string) => {
    const updatedWebhooks = settings.blogGenerator.webhooks.map(webhook =>
      webhook.id === id ? { ...webhook, [field]: value } : webhook
    );
    updateSettings({
      ...settings,
      blogGenerator: {
        ...settings.blogGenerator,
        webhooks: updatedWebhooks
      }
    });
  };

  const removeWebhook = (id: string) => {
    const updatedWebhooks = settings.blogGenerator.webhooks.filter(webhook => webhook.id !== id);
    updateSettings({
      ...settings,
      blogGenerator: {
        ...settings.blogGenerator,
        webhooks: updatedWebhooks
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog Generator Settings</h1>
      {settings.blogGenerator.webhooks.map(webhook => (
        <div key={webhook.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={webhook.name}
            onChange={(e) => updateWebhook(webhook.id, 'name', e.target.value)}
            placeholder="Webhook Name"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={webhook.webhook}
            onChange={(e) => updateWebhook(webhook.id, 'webhook', e.target.value)}
            placeholder="Webhook URL"
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={() => removeWebhook(webhook.id)} className="bg-red-500 text-white p-2 rounded">Remove</button>
        </div>
      ))}
      <button onClick={addWebhook} className="bg-blue-500 text-white p-2 rounded">Add Webhook</button>
    </div>
  );
}