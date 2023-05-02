import LogInTo from '@/components/LogInTo';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React from 'react';
import styles from '../../styles/Layout.module.css';
import Navigation from '@/components/Nav/Navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LogInTo />;
  }
  return (
    <div className={styles.layout} id="tool">
      <Navigation />
      {children}
    </div>
  );
}
