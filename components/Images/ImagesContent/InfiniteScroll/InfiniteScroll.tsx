/* eslint-disable @next/next/no-img-element */
import Spinner from '@/components/Spinner';
import React, { useEffect, useRef, useState } from 'react';

export default function InfiniteScroll({
  images,
  fetchImages,
}: {
  images: { url: string }[];
  fetchImages: (fetchNumber: number) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
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
        //   setFetchNumber(fetchNumber + 1);
          setLoading(false);
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
      {images.map((url, index) => (
        <img
          key={index}
          src={url.url}
          alt={`Image ${index + 1}`}
          ref={index === images.length - 1 ? lastImageRef : null}
          style={{ width: 'auto', height: 'auto', marginBottom: '16px' }}
        />
      ))}
      {loading && <Spinner wh={40} white={false} />}
    </div>
  );
}
