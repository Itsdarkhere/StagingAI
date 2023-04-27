'use client';
import StagingDisplay from '@/components/StagingDisplay/StagingDisplay';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Create() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // checkJWT(authToken);
    }
  }, []);

  if (!session) {
    return <h1>Login to use the app.</h1>
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  // If we have a valid JWT, we can log the user in
  const checkJWT = async (authToken: string) => {
    handleLogin();
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
      handleLogin();
    }
  };

  return <StagingDisplay />;
}
