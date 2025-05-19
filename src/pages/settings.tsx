import { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { AccountSettings } from '../components/AccountSettings';

const Settings: NextPage = () => {
  return (
    <Layout
      title="Settings - NotificationHub"
      description="Manage your notification accounts"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Notifications
        </Link>
      </div>
      <AccountSettings />
    </Layout>
  );
};

export default Settings; 