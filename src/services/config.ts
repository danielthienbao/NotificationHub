export const config = {
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID || '',
    clientSecret: process.env.GMAIL_CLIENT_SECRET || '',
    redirectUri: 'http://localhost:3000/api/auth/callback/google',
  },
  outlook: {
    clientId: process.env.OUTLOOK_CLIENT_ID || '',
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET || '',
    redirectUri: 'http://localhost:3000/api/auth/callback/microsoft',
  },
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN || '',
  },
}; 