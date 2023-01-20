import React from 'react';
import styles from '../styles/LatestRender.module.css';
import Image, { StaticImageData } from 'next/image';

export default function LatestRender({ image }: { image: StaticImageData }) {
  return (
    <div className={styles.latestRender}>
      <Image
        width="0"
        height="0"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 400,
          objectFit: 'cover',
          borderRadius: 4,
        }}
        src={image}
        alt="render"
      />
      <p className={styles.p}>Created in 9 seconds</p>
      <h6 className={styles.heading}>
        Interior Design of a Midcentury Modern Bedroom
      </h6>
    </div>
  );
}
