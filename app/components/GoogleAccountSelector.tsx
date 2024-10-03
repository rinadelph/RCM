import React, { useState, useEffect } from 'react';
import { log } from '@/utils/logger';

interface GoogleAccount {
  id: string;
  name: string;
  serviceName: string;
  isAuthenticated: boolean;
}

interface GoogleAccountSelectorProps {
  onSelect: (accountId: string) => void;
}

const GoogleAccountSelector: React.FC<GoogleAccountSelectorProps> = ({ onSelect }) => {
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        log('Fetching Google accounts');
        const response = await fetch('/api/google-services');
        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
          log('Google accounts fetched successfully', data);
        } else {
          log('Failed to fetch Google accounts', response.statusText);
        }
      } catch (error) {
        log('Error fetching Google accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <div>Loading accounts...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <div
          key={account.id}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            account.isAuthenticated
              ? 'bg-blue-100 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => {
            onSelect(account.id);
            log(`Selected account: ${account.name}`);
          }}
        >
          <h3 className="font-medium text-lg">{account.name}</h3>
          <p className="text-sm text-gray-600">{account.serviceName}</p>
          {account.isAuthenticated ? (
            <span className="text-green-500">Authenticated</span>
          ) : (
            <span className="text-red-500">Not Authenticated</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoogleAccountSelector;