'use client';
import Spinner from '@/components/Spinner';
import { Alert, AlertTitle } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function InfiniteScroll({ session }: { session: any }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);


  useEffect(() => {
    setLoading(true);
    setImageLoaded(false);
    console.log('Fetch', page);

    // Check if user is logged in
    if (!session?.user?.id) return;
    const userId = session.user.id;
    const reqData = {
      userId,
      fetchNumber: page,
    };

    const fetcher = async () => {
      // Send the inference request
      const response = await fetch('/api/images/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      }).then((res) => res.json());

      const data = response.urls;

      if (!data) return;
      setImages((prev: { url: string }[]) => [...prev, ...data]);
      setLoading(false);
      // Set hasMoreImages based on the number of URLs in the response
      setHasMoreImages(data.length >= 20);
    }

    fetcher();

  }, [page])

  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageRef = useCallback(
    (node: any) => {
      // Disconnect if we have observer from previous render
      if (observer.current) observer.current.disconnect();

      // Dont set a new observer if we have all images
      if (!hasMoreImages) return;

      // Set new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      // Observe
      if (node) observer.current.observe(node);
    },
    [hasMoreImages]
  );

  return (
    <div
      style={{
        gap: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '20px 0',
        alignContent: 'flex-start',
      }}
    >
      <div style={{ width: '100%' }}>
        <Alert severity="info" variant="filled">
          <AlertTitle>Information</AlertTitle>
          Generated images are only stored for 72 hours.
        </Alert>
      </div>
      {images.map((url, index) => (
        <img
          ref={(index === images.length - 1) && imageLoaded ? lastImageRef : null}
          onLoad={() => setImageLoaded(true)}
          key={index}
          src={url.url}
          alt={`Image ${index + 1}`}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            marginBottom: '16px',
          }}
        />
      ))}

      {loading && (
        <div style={{ padding: 50, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner wh={40} white={false} />
        </div>
      )}
      {!hasMoreImages && (
        <div style={{ width: '100%' }}>
        <Alert severity="info" variant="filled">
          <AlertTitle>End of images</AlertTitle>
          You have seen all stored images.
        </Alert>
      </div>
      )}
    </div>
  );
}
