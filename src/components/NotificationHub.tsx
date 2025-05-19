import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NotificationItem } from './NotificationItem';
import { BaseNotification, NotificationSource } from '../types/notifications';

export const NotificationHub: React.FC = () => {
  const [notifications, setNotifications] = useState<BaseNotification[]>([]);
  const [selectedSource, setSelectedSource] = useState<NotificationSource | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sources: NotificationSource[] = ['gmail', 'outlook', 'iphone', 'slack'];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data as BaseNotification[]);
        setError(null);
      } catch (err) {
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationRead = (id: string) => {
    setNotifications((prevNotifications: BaseNotification[]) =>
      prevNotifications.map((notification: BaseNotification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = selectedSource === 'all'
    ? notifications
    : notifications.filter((notification: BaseNotification) => notification.source === selectedSource);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notification Hub</h1>
        <Link
          href="/settings"
          className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Settings ⚙️
        </Link>
      </div>
      
      <div className="mb-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSource === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedSource('all')}
        >
          All
        </button>
        {sources.map(source => (
          <button
            key={source}
            className={`px-4 py-2 rounded-lg capitalize ${
              selectedSource === source ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedSource(source)}
          >
            {source}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-8">{error}</p>
        ) : filteredNotifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notifications</p>
        ) : (
          filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={handleNotificationRead}
            />
          ))
        )}
      </div>
    </div>
  );
}; 