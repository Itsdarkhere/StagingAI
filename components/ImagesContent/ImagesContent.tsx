'use client';
import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from '../../styles/ImagesContent.module.css';

export default function ImagesContent() {
  const [images, setImages] = React.useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (fetchNumber: number) => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
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
    setLoading(false);
    setImages((prev: { url: string }[]) => [...prev, ...data]);
  };

  //   useEffect(() => {
  //     fetchImages(1);
  //   }, []);

  return (
    <div className={styles.container}>
      <InfiniteScroll
        images={images}
        fetchImages={fetchImages}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
