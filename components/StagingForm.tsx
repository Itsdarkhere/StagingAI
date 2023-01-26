'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import Select from 'react-select';
import StagingTop from './StagingTop';
import StagingDropZone from './FormDropZone';
import FormSelect from './FormSelect';

export default function StagingForm({handleCopies, fetchImage}: {handleCopies: (event: React.ChangeEvent<HTMLInputElement>) => void, fetchImage: () => void}) {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [fetching, setFetching] = useState(false);
  const [mode, setMode] = useState(false);

  interface Option {
    value: string;
    label: string;
  }
  const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  // handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]); 
      reader.onload = function() {
        setImage(reader.result);
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); 
      reader.onload = function() {
        setImage(reader.result);
      }
    }
  };

  const clickMode = (mode: boolean) => {
    setMode(mode);
  };

  const validateForm = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }
    // Set fetching to true.
    setFetching(true);
  };

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCopies(event);
  }

  return (
    <div className={styles.stagingForm}>
      <StagingTop mode={mode} clickMode={clickMode} />
      <form
        onSubmit={(e) => validateForm(e)}
        className={styles.form}
        onDragEnter={handleDrag}
      >
        <label htmlFor="input-file-upload" className={styles.label}>
          Current Interior
        </label>
        <StagingDropZone image={image} handleChange={handleChange} dragActive={dragActive} handleDrag={handleDrag} handleDrop={handleDrop}  />
        <label htmlFor="room" className={styles.label}>
          Room Type
        </label>
        <FormSelect options={options} />
        <label htmlFor="style" className={styles.label}>
          Style
        </label>
        <FormSelect options={options} />
        <label htmlFor="copies" className={styles.label}>
          Amount of copies
        </label>
        <input min={1} max={10} onChange={sliderChange} id="copies" name="copies" type="range" required className={styles.slider} />
        <button type='submit' className={`${primaryStyles.button} ${styles.button}`}>
          Render Images
        </button>
      </form>
    </div>
  );
}
