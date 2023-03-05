import React from 'react';
import Image from 'next/image';
import IMAGE from '../public/image.svg';
import BRUSH from '../public/brush.svg';
import styles from '../styles/StagingForm.module.css';

export default function FormSwitch({
  mode,
  clickMode,
}: {
  mode: boolean;
  clickMode: (mode: boolean) => void;
}) {
  return (
    <div className={styles.formTop}>
      <button
        onClick={() => clickMode(false)}
        className={`${styles.topButton} ${!mode && styles.selected}`}
      >
        <Image
          className={`${!mode && styles.brightImage}`}
          src={BRUSH}
          height={15}
          alt="trash"
          style={{ marginRight: 5 }}
        />
        Inpainting
      </button>
      <button
        onClick={() => clickMode(true)}
        className={`${styles.topButton} ${mode && styles.selected}`}
      >
        <Image
          className={`${mode && styles.brightImage}`}
          src={IMAGE}
          alt="plus"
          height={15}
          style={{ marginRight: 5 }}
        />
        Full Image
      </button>
    </div>
  );
}
