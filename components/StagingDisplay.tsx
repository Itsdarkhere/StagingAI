import React from 'react';
import styles from '../styles/StagingDisplay.module.css';
import RenderBox from './RenderBox';

export default function StagingDisplay({img64}: {img64: string | null}) {
  return (
    <div className={styles.stagingDisplay}>
      <RenderBox img64={img64} />
    </div>
  );
}
