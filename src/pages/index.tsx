import { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { NotificationHub } from '../components/NotificationHub';

const Home: NextPage = () => {
  return (
    <Layout
      title="NotificationHub - All Your Notifications in One Place"
      description="Unified notification center for Gmail, Outlook, iPhone, and Slack messages"
    >
      <NotificationHub />
    </Layout>
  );
};

export default Home; 