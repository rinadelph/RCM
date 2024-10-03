'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/analytics', label: 'Dashboard' },
  { href: '/analytics/acquisition', label: 'Acquisition' },
  { href: '/analytics/behavior', label: 'Behavior' },
  { href: '/analytics/conversions', label: 'Conversions' },
];

const SideMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link href={item.href}
              className={`block p-2 rounded ${
                pathname === item.href
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;