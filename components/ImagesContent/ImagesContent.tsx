'use client';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from '../../styles/ImagesContent.module.css';
import { useSession } from 'next-auth/react';

export default function ImagesContent() {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const session = useSession();

  const fetchImages = async (fetchNumber: number) => {
    setLoading(true);
    console.log("b4 session", session)
    if (!session?.data?.user?.id) return;
    const userId = session.data.user.id;
    const reqData = {
      userId,
      fetchNumber,
    };
    console.log("Should fetch")
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

  useEffect(() => {
    if (!session) return;
    fetchImages(1);
  }, [session])

  return (
    <div className={styles.container}>
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
