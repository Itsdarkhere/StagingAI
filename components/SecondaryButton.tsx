'use client';
import React from 'react';
import styles from '../styles/SecondaryButton.module.css';

export default function SecondaryButton({
  text,
  margin,
}: {
  text: string;
  margin: boolean;
}) {
  return (
    <button className={`${styles.button} ${margin ? styles.mr : ''}`}>
      {text}
    </button>
  );
}
