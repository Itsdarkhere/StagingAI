'use client';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Analytics />
      {children}
    </SessionProvider>
  )
}