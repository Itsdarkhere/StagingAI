import React, { useEffect } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from "../../../styles/ImagesContent.module.css"

export default function ImagesContent() {
  const [images, setImages] = React.useState<{ url: string }[]>([]);

  const fetchImages = async (fetchNumber: number) => {
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

    console.log(data);
    setImages((prev: { url: string }[]) => [...prev, ...data]);
  };

  useEffect(() => {
    console.log("LOG LOG")
    fetchImages(1);
  }, []);

  return (
    <div className={styles.container}>
      <InfiniteScroll images={images} fetchImages={fetchImages} />
    </div>
  );
}
