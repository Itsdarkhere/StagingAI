import React from 'react';
import styles from '../styles/StagingDisplay.module.css';
import RenderBox from './RenderBox';

export default function StagingDisplay({copies}: {copies: number}) {
  return (
    <div className={styles.stagingDisplay}>
      <RenderBox copies={copies} />
    </div>
  );
}
