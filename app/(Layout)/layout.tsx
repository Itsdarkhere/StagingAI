// 'use client';
import SideNav from '@/components/SideNav';
import React from 'react';
import styles from '../../styles/Layout.module.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import LogInTo from '@/components/LogInTo';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <LogInTo />
        )
    }
  return (
    <div className={styles.layout} id="tool">
      <SideNav />
      {children}
    </div>
  );
}
