'use client';
import Spinner from '@/components/Spinner';
import React, { useEffect, useRef } from 'react';

export default function InfiniteScroll({
  images,
  fetchImages,
  loading,
  setLoading,
  hasMoreImages,
}: {
  images: { url: string }[];
  fetchImages: (fetchNumber: number) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  hasMoreImages: boolean;
}) {
  const [fetchNumber, setFetchNumber] = React.useState<number>(1);

  return (
    <div
      style={{
        gap: 20,
        paddingTop: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {images.map((url, index) => (
        <img
          key={index}
          src={url.url}
          alt={`Image ${index + 1}`}
          style={{ width: 'auto', minHeight: 100, minWidth: 100, backgroundColor: 'grey', height: 'auto', marginBottom: '16px' }}
        />
      ))}
      {loading && (
        <div style={{ padding: 50 }}>
          <Spinner wh={40} white={false} />
        </div>
      )}
    </div>
  );
}
