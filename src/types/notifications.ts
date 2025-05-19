export type NotificationSource = 'gmail' | 'outlook' | 'iphone' | 'slack';

export interface BaseNotification {
  id: string;
  source: NotificationSource;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface EmailNotification extends BaseNotification {
  sender: string;
  subject: string;
}

export interface SlackNotification extends BaseNotification {
  channel: string;
  workspace: string;
}

export const sourceColors: Record<NotificationSource, string> = {
  gmail: 'bg-red-100 border-red-500',
  outlook: 'bg-blue-100 border-blue-500',
  iphone: 'bg-gray-100 border-gray-500',
  slack: 'bg-purple-100 border-purple-500',
}; 