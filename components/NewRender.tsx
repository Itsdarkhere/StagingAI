/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/NewRender.module.css';

export default function NewRender({
  image,
  upscale,
  openModal
}: {
  image: string;
  upscale: () => void;
  openModal: (imgURL: string) => void;
}) {
  return (
    <div className={styles.render}>
      <div className={styles.imageOptions}>
        <button className={`${styles.optionButton}`}>Download</button>
        <button className={`${styles.optionButton}`}  onClick={upscale}>Upscale</button>
      </div>
      <img
        onClick={() => openModal(image)}
        src={image}
        alt="render"
        style={{
          width: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '100%',
          maxHeight: '520px',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}
