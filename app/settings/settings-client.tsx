'use client'

import React from 'react'
import SettingsSidebar from './components/SettingsSidebar'
import { useMediaQuery } from 'react-responsive';
import { SettingsProvider, useSettings } from './contexts/SettingsContext'

function SettingsContent({ children }: { children: React.ReactNode }) {
  const { isSaving } = useSettings();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-lg font-semibold">Saving...</div>
        </div>
      )}
      <div className={`bg-gray-100 p-4 ${isMobile ? 'w-full' : 'w-64 h-screen'}`}>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <SettingsSidebar />
      </div>
      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
}

export default function SettingsClient({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <SettingsContent>{children}</SettingsContent>
    </SettingsProvider>
  );
}