'use client';

import { useState } from 'react';
import DashboardSideMenu from '../components/DashboardSideMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Toggle button */}
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-gray-200 rounded-md"
        onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
      >
        {isSideMenuOpen ? '←' : '→'}
      </button>

      {/* Side menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="p-4 mt-16">
          <DashboardSideMenu />
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-8 ${isSideMenuOpen ? 'ml-64' : ''} transition-margin duration-300 ease-in-out`}>
        {children}
      </div>
    </div>
  );
}