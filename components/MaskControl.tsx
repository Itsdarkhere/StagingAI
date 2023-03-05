import React from 'react';
import BACK2 from '../public/back2.svg';
import DELETE from '../public/delete.svg';
import Image from 'next/image';
import styles from '../styles/MaskControl.module.css';
import { Tooltip } from 'react-tooltip';

export default function MaskControl({
  undo,
  sliderChange,
  clear,
  strokeWidth,
}: {
  undo: () => void;
  sliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  strokeWidth: number;
}) {
  return (
    <div className={styles.maskControl}>
      <div className={styles.controlTop}>
        <label className={styles.controlLabel}>Mask Controls</label>
        <button className={styles.controlClose}>X</button>
      </div>
      <div className={styles.controlBottom}>
        <Tooltip place='left' style={{opacity: 1}} variant='light' anchorSelect=".control-tooltip" />
        <input
          min={1}
          max={100}
          onChange={sliderChange}
          defaultValue={strokeWidth}
          id="copies"
          name="width"
          type="range"
          className={styles.controlSlider}
        />
        <input
          className={styles.controlValue}
          type={'text'}
          defaultValue={strokeWidth}
        />
        <button className={`${styles.controlB} control-tooltip`} data-tooltip-content="Undo previous action" onClick={undo}>
          <Image width={20} height={20} src={BACK2} alt="back" />
        </button>
        <button className={`${styles.controlR} control-tooltip`} data-tooltip-content="Remove paint" onClick={clear}>
          <Image width={20} height={20} src={DELETE} alt="back" />
        </button>
      </div>
    </div>
  );
}
