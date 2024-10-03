'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FiHome, FiUser, FiSettings, FiDatabase, FiLogOut, FiFileText, FiCoffee, FiMail, FiArrowLeft } from 'react-icons/fi';
import UserSettings from '../components/settings/UserSettings';
import GeneralSettings from '../components/settings/GeneralSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import GoogleSettings from '../components/settings/GoogleSettings';
import ClaritySettings from '../components/settings/ClaritySettings';
import AISettings from '../components/settings/AISettings';
import ColdEmailSettings from '../components/settings/ColdEmailSettings';
import BlogGeneratorSettings from '../components/settings/BlogGeneratorSettings';

const menuItems = [
  { id: 'general', label: 'General', icon: FiSettings },
  { id: 'user', label: 'User Profile', icon: FiUser },
  { id: 'integrations', label: 'Integrations', icon: FiDatabase },
  { id: 'google', label: 'Google', icon: FiFileText },
  { id: 'clarity', label: 'Clarity', icon: FiCoffee },
  { id: 'ai', label: 'AI', icon: FiDatabase },
  { id: 'cold-email', label: 'Cold Email', icon: FiMail },
  { id: 'blog-generator', label: 'Blog Generator', icon: FiFileText },
];

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('general');

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-screen">Access Denied</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'user':
        return <UserSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'google':
        return <GoogleSettings />;
      case 'clarity':
        return <ClaritySettings />;
      case 'ai':
        return <AISettings />;
      case 'cold-email':
        return <ColdEmailSettings />;
      case 'blog-generator':
        return <BlogGeneratorSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        </div>
        <nav className="mt-5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-6 py-3 mt-2 text-left ${
                activeTab === item.id
                  ? 'text-blue-500 bg-blue-100 border-r-4 border-blue-500'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
          <Link href="/dashboard" className="flex items-center w-full px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200 rounded">
            <FiArrowLeft className="w-5 h-5 mr-3" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">{menuItems.find(item => item.id === activeTab)?.label}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}