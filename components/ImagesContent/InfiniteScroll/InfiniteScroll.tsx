'use client';
import Spinner from '@/components/Spinner';
import { Alert, AlertTitle } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function InfiniteScroll({ session }: { session: any }) {
  const [page, setPage] = React.useState<number>(1);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const fetchImages = async (fetchNumber: number) => {
    setLoading(true);
    console.log("Fetch", fetchNumber);
    if (!session?.user?.id) return;
    const userId = session.user.id;
    const reqData = {
      userId,
      fetchNumber,
    };

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
  };

  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreImages) {
          setPage((prevPage) => prevPage + 1);
          fetchImages(page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreImages, page]
  );

  useEffect(() => {
    fetchImages(1);
  }, []);

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
      <div style={{ width: '100%' }}>
        <Alert severity="info" variant="filled">
          <AlertTitle>Information</AlertTitle>
          Generated images are only stored for 72 hours.
        </Alert>
      </div>
      {images.map((url, index) => (
        <img
          ref={index === images.length - 1 ? lastImageRef : null}
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
        <div style={{ padding: 50 }}>
          <Spinner wh={40} white={false} />
        </div>
      )}
    </div>
  );
}
