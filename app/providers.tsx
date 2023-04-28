'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Analytics />
      {children}
    </SessionProvider>
  );
}