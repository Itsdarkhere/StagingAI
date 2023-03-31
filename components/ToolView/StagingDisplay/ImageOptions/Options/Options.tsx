import FormAdd from '@/components/FormAdd';
import Spinner from '@/components/Spinner';
import OptionsModel from '@/components/ToolView/StagingDisplay/ImageOptions/Options/OptionsModel/OptionsModel';
import React, { useState } from 'react';
import styles from '../../../../../styles/Options.module.css';
import primaryStyles from '../../../../../styles/PrimaryButton.module.css';

export default function Options({
  fetching,
  clickMode,
  mode,
  copies,
  sliderChange,
}: {
  fetching: boolean;
  clickMode: (mode: boolean) => void;
  mode: boolean;
  copies: number;
  sliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.container}>
      <OptionsModel clickMode={clickMode} mode={mode} />
      <FormAdd />
      <label htmlFor="copies" className={styles.label}>
        Amount of copies
      </label>
      <input
        min={1}
        max={8}
        onChange={sliderChange}
        value={copies}
        id="copies"
        name="copies"
        type="range"
        required
        className={styles.slider}
      />
      <button
        type="submit"
        disabled={fetching}
        className={`${primaryStyles.button} ${styles.button}`}
      >
        {fetching ? <Spinner wh={30} white={true} /> : 'Magic'}
      </button>
    </div>
  );
}
