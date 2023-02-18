import React from 'react';
import styles from '../styles/StagingDisplay.module.css';
import MaskBox from './MaskBox';
import RenderBox from './RenderBox';

export default function StagingDisplay({img64, originalImage, mode, rendering}: {img64: string | null, originalImage: string | undefined, mode: boolean, rendering: boolean}) {
  return (
    <div className={styles.stagingDisplay}>
      {mode ? <RenderBox img64={img64} rendering={rendering} /> : <MaskBox originalImage={originalImage} img64={img64} rendering={rendering} />}
    </div>
  );
}
