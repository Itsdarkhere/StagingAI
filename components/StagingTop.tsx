import React from 'react';
import Image from 'next/image';
import PLUS from '../public/plus.svg';
import TRASH from '../public/trash.svg';
import styles from '../styles/StagingForm.module.css';

export default function StagingTop({
  mode,
  clickMode,
}: {
  mode: boolean;
  clickMode: (mode: boolean) => void;
}) {
  return (
    <div className={styles.formTop}>
      <button
        onClick={() => clickMode(true)}
        className={`${styles.topButton} ${mode && styles.selected}`}
      >
        <Image
          className={`${mode && styles.brightImage}`}
          src={PLUS}
          alt="plus"
          style={{ marginRight: 5 }}
        />
        Add
      </button>
      <button
        onClick={() => clickMode(false)}
        className={`${styles.topButton} ${!mode && styles.selected}`}
      >
        <Image
          className={`${!mode && styles.brightImage}`}
          src={TRASH}
          alt="trash"
          style={{ marginRight: 5 }}
        />
        Remove
      </button>
    </div>
  );
}
