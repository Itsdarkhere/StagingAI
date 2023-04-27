'use client';
import SideNav from '@/components/SideNav';
import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout} id="tool">
      <SideNav handleLogout={() => undefined} />
      {children}
    </div>
  );
}
