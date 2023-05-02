'use client';
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react';

export default function InfiniteScroll({ session }: { session: any }) {
  const [page, setPage] = React.useState<number>(1);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    fetchImages(1);
  }, [])

  const fetchImages = async (fetchNumber: number) => {
    setLoading(true);
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

  return (
    <div
      style={{
        gap: 20,
        paddingTop: 20,
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
