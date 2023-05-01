'use client';
import { useState } from 'react';
import Header from './Header';
import SideNav from './SideNav';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header setOpen={setOpen} />
      <SideNav open={open} setOpen={setOpen} />
    </>
  );
}
