'use client';
import { useState } from 'react';
import Login from '@/components/Login/Login';
import ToolView from '@/components/ToolView/ToolView';
import SideNav from '../components/SideNav';

export default function Create() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={{ flex: 1 }}>
      {isLoggedIn ? <ToolView /> : <Login handleLogin={handleLogin} />}
    </div>
  );
}
