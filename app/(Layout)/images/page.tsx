// prettier-ignore
import ImagesContent from '@/components/ImagesContent/ImagesContent';
import React from 'react';

export default function Home() {
  {/* @ts-expect-error Server Component */}
  return <ImagesContent />;
}
