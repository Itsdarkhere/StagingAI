'use client'
import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React, { useState } from 'react';
import styles from '../../styles/Staging.module.css';


export default function Create() {
  const [img64, setImg] = useState(null);
  const [fetching, setFetching] = useState(false);
  const fetchImage = async () => {
    setFetching(true);
    try {
      const res = await fetch(`/api/form`, {
        method: 'POST',
      });
      const data = await res.json();
      setImg(data.data.modelOutputs[0].image_base64)
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  }

  return (
    <div className={styles.staging}>
      <StagingForm fetchImage={fetchImage} fetching={fetching} />
      <StagingDisplay img64={img64} />
    </div>
  );
}
