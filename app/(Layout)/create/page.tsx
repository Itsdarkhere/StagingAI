'use client';
import StagingDisplay from '@/components/StagingDisplay/StagingDisplay';
import { useEffect, useState } from 'react';

export default function Create() {
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // checkJWT(authToken);
    }
  }, []);

  // If we have a valid JWT, we can log the user in
  const checkJWT = async (authToken: string) => {
    return;
    // Perform authentication logic here (e.g., call an API)
    const res = await fetch('/api/auth/checkJWT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken,
      },
    });

    if (res?.ok) {
      // handleLogin();
    }
  };

  return <StagingDisplay />;
}
