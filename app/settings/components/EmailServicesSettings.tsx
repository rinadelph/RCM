import React from 'react';
import { Settings } from '../types';

interface Props {
  settings: Settings;
  handleNestedInputChange: (section: keyof Settings, subSection: string, key: string, value: string) => void;
  handleAddEmailAccount: () => void;
  handleRemoveEmailAccount: (id: string) => void;
  handleEmailAccountChange: (id: string, field: string, value: string) => void;
}

export function EmailServicesSettings({
  settings,
  handleNestedInputChange,
  handleAddEmailAccount,
  handleRemoveEmailAccount,
  handleEmailAccountChange
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Instantly.ai</h3>
        <div className="mt-2 space-y-2">
          <div>
            <label htmlFor="instantlyApiKey" className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="text"
              id="instantlyApiKey"
              value={settings.emailServices.instantly.apiKey}
              onChange={(e) => handleNestedInputChange('emailServices', 'instantly', 'apiKey', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="instantlyWorkspaceId" className="block text-sm font-medium text-gray-700">Workspace ID</label>
            <input
              type="text"
              id="instantlyWorkspaceId"
              value={settings.emailServices.instantly.workspaceId}
              onChange={(e) => handleNestedInputChange('emailServices', 'instantly', 'workspaceId', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Email Accounts</h3>
        {settings.emailServices.accounts.map((account) => (
          <div key={account.id} className="mt-4 p-4 border rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <select
                value={account.provider}
                onChange={(e) => handleEmailAccountChange(account.id, 'provider', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
                <option value="smtp">SMTP</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={account.email}
                onChange={(e) => handleEmailAccountChange(account.id, 'email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {account.provider === 'smtp' && (
              <>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                  <input
                    type="text"
                    value={account.smtpHost || ''}
                    onChange={(e) => handleEmailAccountChange(account.id, 'smtpHost', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                  <input
                    type="text"
                    value={account.smtpPort || ''}
                    onChange={(e) => handleEmailAccountChange(account.id, 'smtpPort', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </>
            )}
            <button
              onClick={() => handleRemoveEmailAccount(account.id)}
              className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Remove Account
            </button>
          </div>
        ))}
        <button
          onClick={handleAddEmailAccount}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Email Account
        </button>
      </div>
    </div>
  );
}