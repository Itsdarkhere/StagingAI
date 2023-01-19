import Hero from '@/components/Sections/Hero';
import How from '@/components/Sections/How';
import Latest from '@/components/Sections/Latest';
import Pricing from '@/components/Sections/Pricing';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Hero />
      <How />
      <Latest />
      <Pricing />
    </div>
  );
}
