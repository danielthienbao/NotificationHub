import React, { useState, useEffect } from 'react';
import { NotificationSource } from '../types/notifications';
import { Button } from './Button';

interface AccountConfig {
  email: string;
  connected: boolean;
}

type AccountSettings = Record<NotificationSource, AccountConfig>;

const INITIAL_ACCOUNTS: AccountSettings = {
  gmail: { email: '', connected: false },
  outlook: { email: '', connected: false },
  iphone: { email: '', connected: false },
  slack: { email: '', connected: false },
};

export const AccountSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountSettings>(INITIAL_ACCOUNTS);

  useEffect(() => {
    // Load saved accounts from localStorage
    const savedAccounts = localStorage.getItem('notificationAccounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  const updateAccounts = (newAccounts: AccountSettings) => {
    setAccounts(newAccounts);
    localStorage.setItem('notificationAccounts', JSON.stringify(newAccounts));
  };

  const handleEmailChange = (source: NotificationSource, email: string) => {
    updateAccounts({
      ...accounts,
      [source]: { ...accounts[source], email },
    });
  };

  const handleConnect = async (source: NotificationSource) => {
    const email = accounts[source].email;
    try {
      // Send email and source to backend
      await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, email }),
      });
      updateAccounts({
        ...accounts,
        [source]: { ...accounts[source], connected: true },
      });
    } catch (err) {
      alert('Failed to connect. Please try again.');
    }
  };

  const handleDisconnect = async (source: NotificationSource) => {
    updateAccounts({
      ...accounts,
      [source]: { ...accounts[source], connected: false },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <div className="space-y-6">
        {(Object.keys(accounts) as NotificationSource[]).map((source) => (
          <div
            key={source}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold capitalize mb-4">{source}</h3>
            <div className="flex items-center gap-4">
              <input
                type="email"
                placeholder={`Enter your ${source} email`}
                value={accounts[source].email}
                onChange={(e) => handleEmailChange(source, e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={accounts[source].connected}
              />
              {accounts[source].connected ? (
                <Button
                  variant="danger"
                  onClick={() => handleDisconnect(source)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  onClick={() => handleConnect(source)}
                  disabled={!accounts[source].email}
                >
                  Connect
                </Button>
              )}
            </div>
            {accounts[source].connected && (
              <p className="text-green-600 mt-2">✓ Connected</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 