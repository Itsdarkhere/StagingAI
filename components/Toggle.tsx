import React from 'react';
import styles from '../styles/Toggle.module.css';

export default function Toggle() {
  return (
    <label className={styles.switch}>
      <input type={styles.checkbox} />
      <span className={styles.slider}></span>
    </label>
  );
}
