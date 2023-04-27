'use client'
import Footer from '@/components/Sections/Footer';
import Hero from '@/components/Sections/Hero';
import How from '@/components/Sections/How';
import Latest from '@/components/Sections/Latest';
import Pricing from '@/components/Sections/Pricing';
import { redirect } from "next/navigation"
import React from 'react';

export default function Home() {
  // F the landing redirect to create
  redirect('/create');

  return (
    <div>
      <Hero />
      <How />
      <Latest />
      <Pricing />
      <Footer />
    </div>
  );
}
