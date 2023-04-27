/* eslint-disable @next/next/no-img-element */
import Spinner from '@/components/Spinner';
import React, { useEffect, useRef, useState } from 'react';

export default function InfiniteScroll({
  images,
  fetchImages,
  loading,
  setLoading,
}: {
  images: { url: string }[];
  fetchImages: (fetchNumber: number) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLImageElement | null>(null);
  const [fetchNumber, setFetchNumber] = React.useState<number>(1);

  useEffect(() => {
    if (loading || images.length === 0) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          await fetchImages(fetchNumber);
        }
      },
      { threshold: 1 }
    );

    if (lastImageRef.current) observer.current.observe(lastImageRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [images, loading, fetchImages]);

  return (
    <div
      style={{
        gap: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ width: '100%', padding: '20px' }}>
        <p style={{ textAlign: 'start', color: 'rgb(52, 71, 103)' }}>
          Generated images are only stored once the product is finalized.
        </p>
      </div>
      {images.map((url, index) => (
        <img
          key={index}
          src={url.url}
          alt={`Image ${index + 1}`}
          ref={index === images.length - 1 ? lastImageRef : null}
          style={{ width: 'auto', height: 'auto', marginBottom: '16px' }}
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
