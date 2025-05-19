import { NextApiRequest, NextApiResponse } from 'next';
import { BaseNotification } from '../../types/notifications';

// This is a mock implementation. In a real application, you would integrate with actual services
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseNotification[]>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // Mock notifications for demonstration
  const mockNotifications: BaseNotification[] = [
    {
      id: '1',
      source: 'gmail',
      title: 'New Email from John Doe',
      message: 'Hey, just checking in on the project status...',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      source: 'slack',
      title: 'Message in #general',
      message: 'Team meeting starts in 10 minutes!',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '3',
      source: 'outlook',
      title: 'Meeting Reminder',
      message: 'Weekly sync at 2 PM',
      timestamp: new Date(),
      read: true,
    },
    {
      id: '4',
      source: 'iphone',
      title: 'New iMessage',
      message: 'Are we still on for lunch?',
      timestamp: new Date(),
      read: false,
    },
  ];

  res.status(200).json(mockNotifications);
} 