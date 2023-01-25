import Image from 'next/image';
import React from 'react';
import styles from '../styles/StagingDisplay.module.css';

export default function StagingDisplay({image}: {image: string}) {
  return (
    <div className={styles.stagingDisplay}>
      <div className={`${styles.stagingBox} ${!image && styles.shimmer}`}>
        {image && <Image fill style={{objectFit: 'cover'}} src={image} alt="generated image" />}
      </div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
      <div className={`${styles.stagingBox} ${styles.shimmer}`}></div>
    </div>
  );
}
