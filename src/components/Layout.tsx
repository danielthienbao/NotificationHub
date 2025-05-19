import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}; 