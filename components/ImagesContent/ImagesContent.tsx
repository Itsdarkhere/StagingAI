'use client';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from '../../styles/ImagesContent.module.css';
import { useSession } from 'next-auth/react';
import { Alert, AlertTitle } from '@mui/material';

export default function ImagesContent() {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetchImages(1);
    }
  }, [session.status])

  const fetchImages = async (fetchNumber: number) => {
    setLoading(true);
    if (!session?.data?.user?.id) return;
    const userId = session.data.user.id;
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
    <div className={styles.container}>
      <Alert severity="info" variant='filled'>
        <AlertTitle>Information</AlertTitle>
        Generated images are only stored for 72 hours. 
      </Alert>
      <InfiniteScroll
        images={images}
        hasMoreImages={hasMoreImages}
        fetchImages={fetchImages}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
