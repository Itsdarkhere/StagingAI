'use client';
import React from 'react';
import SideNav from '../SideNav';
import ImagesContent from './ImagesContent/ImagesContent';

export default function Images() {
  const handleLogoutFake = () => {
    console.log('IM FAKE');
  };
  
  return (
    <div style={{ flex: 1 }}>
      <SideNav handleLogout={handleLogoutFake} />
      <ImagesContent />
    </div>
  );
}
