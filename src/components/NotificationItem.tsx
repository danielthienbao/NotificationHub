import React from 'react';
import { format } from 'date-fns';
import { BaseNotification, sourceColors } from '../types/notifications';

interface NotificationItemProps {
  notification: BaseNotification;
  onRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
}) => {
  const {
    id,
    source,
    title,
    message,
    timestamp,
    read,
  } = notification;

  return (
    <div
      className={`p-4 mb-4 rounded-lg border-l-4 transition-all ${
        sourceColors[source]
      } ${read ? 'opacity-50' : ''}`}
      onClick={() => onRead(id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 mt-1">{message}</p>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(timestamp), 'MMM d, h:mm a')}
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <span className="text-sm font-medium capitalize">{source}</span>
        {!read && (
          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
}; 