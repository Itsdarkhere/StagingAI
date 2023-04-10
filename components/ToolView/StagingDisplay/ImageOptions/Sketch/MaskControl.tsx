import React from 'react';
import BACK2 from '../../../../../public/back2.svg';
import DELETE from '../../../../../public/delete.svg';
import Image from 'next/image';
import styles from '../../../../../styles/MaskControl.module.css';
import { Tooltip } from 'react-tooltip';
import { Slider } from "@mui/material"

export default function MaskControl({
  undo,
  sliderChange,
  clear,
  strokeWidth,
}: {
  undo: () => void;
  sliderChange: (event: Event, value: number | number[], activeThumb: number) => void;
  clear: () => void;
  strokeWidth: number;
}) {
  return (
    <div className={styles.maskControl}>
      {/* <div className={styles.controlTop}>
        <label className={styles.controlLabel}>Mask Controls</label>
      </div> */}
      <div className={styles.controlBottom}>
        <Tooltip
          delayShow={500}
          place="left"
          style={{ opacity: 1 }}
          variant="light"
          anchorSelect=".control-tooltip"
        />
        <Slider 
          min={25}
          max={200}
          onChange={sliderChange}
          defaultValue={50}
          id="copies"
          name="width"
        />
        <input
          className={styles.controlValue}
          type={'text'}
          defaultValue={strokeWidth}
        />
        <button
          className={`${styles.controlB} control-tooltip`}
          data-tooltip-content="Undo previous action"
          onClick={undo}
          type='button'
        >
          <Image width={20} height={20} src={BACK2} alt="back" />
        </button>
        <button
          type="button"
          className={`${styles.controlR} control-tooltip`}
          data-tooltip-content="Remove paint"
          onClick={clear}
        >
          <Image width={20} height={20} src={DELETE} alt="back" />
        </button>
      </div>
    </div>
  );
}
