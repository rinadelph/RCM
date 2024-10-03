'use client'

import { useState } from 'react';
import SettingsSideMenu from '../components/SettingsSideMenu';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      {children}
    </div>
  );
}