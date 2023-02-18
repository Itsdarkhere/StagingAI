import React, { RefObject } from 'react';
import styles from '../styles/StagingDisplay.module.css';
import MaskBox from './MaskBox';
import RenderBox from './RenderBox';

export default function StagingDisplay({sketchRef, img64, originalImage, mode, rendering}: 
  {sketchRef: RefObject<any>, img64: string | null, originalImage: string | undefined, mode: boolean, rendering: boolean}) {
  return (
    <div className={styles.stagingDisplay}>
      <MaskBox sketchRef={sketchRef} originalImage={originalImage} img64={img64} rendering={rendering} />
    </div>
  );
}
