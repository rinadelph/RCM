'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '../contexts/SettingsContext';

const settingsTabs = [
  { name: 'User Info', path: '/settings/user-info' },
  { name: 'Google', path: '/settings/google' },
  { name: 'Clarity', path: '/settings/clarity' },
  { name: 'AI', path: '/settings/ai' },
  { name: 'Cold Email', path: '/settings/cold-email' },
  { name: 'Blog Generator', path: '/settings/blog-generator' },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const { saveSettings } = useSettings();

  return (
    <nav className="space-y-1">
      <Link
        href="/dashboard"
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md mb-4"
      >
        <svg
          className="mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Dashboard
      </Link>
      {settingsTabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.path}
          className={`${
            pathname === tab.path
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
        >
          {tab.name}
        </Link>
      ))}
      <button
        onClick={saveSettings}
        className="w-full mt-4 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
      >
        Save All Settings
      </button>
    </nav>
  );
}