'use client';
import { useEffect, useState } from 'react';
import Login from '@/components/Login/Login';
import ToolView from '@/components/ToolView/ToolView';

export default function Create() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      checkJWT(authToken);
    }
  }, []);

  return (
    <div style={{ flex: 1 }}>
      {isLoggedIn ? (
        <ToolView handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}
