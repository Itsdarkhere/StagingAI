'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import StagingTop from './StagingTop';
import FormDropZone from './FormDropZone';
import FormSelect from './FormSelect';
import { ProgressBar } from 'react-loader-spinner';

export default function StagingForm({fetchImage, fetching}: {fetchImage: (reqData: {room: string, style: string}) => void, fetching: boolean}) {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState(false);

  interface Option {
    value: string;
    label: string;
  }
  const roomOptions: Option[] = [
    { value: 'living room', label: 'Living room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'study room', label: 'Study room' },
    { value: 'home office', label: 'Home office' },
    { value: 'dining room', label: 'Dining room' },
    { value: 'bathroom', label: 'Bathroom' },
  ];

  const styleOptions: Option[] = [
    { value: 'modern', label: 'Modern' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'midcentury modern', label: 'Midcentury modern' },
    { value: 'rustic', label: 'Rustic' },
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
      reader.readAsArrayBuffer(e.dataTransfer.files[0]); 
      reader.onload = function() {
        let blob = new Blob([reader.result as ArrayBuffer]);
        let url = URL.createObjectURL(blob);
        setImage(url);
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]); 
      reader.onload = function() {
        let blob = new Blob([reader.result as ArrayBuffer]);
        let url = URL.createObjectURL(blob);
        setImage(url);
      }
    }
  };

  // Remove image from state
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(undefined);
  }

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

    const target = event.target as typeof event.target & {
      room: { value: string };
      style: { value: string };
    };

    const data = {
      room: target.room.value,
      style: target.style.value,
      // https://i.pinimg.com/474x/3e/61/d8/3e61d820bab59547d2c319bcd0c20c99.jpg
      // https://media.istockphoto.com/id/990278494/photo/empty-concrete-wall.jpg?b=1&s=612x612&w=0&k=20&c=CXzQ1BKVkZCiVDbLZFDK8j29FWU8FDcdsw1nhoIUMQ8=
      image: 'https://i.pinimg.com/474x/3e/61/d8/3e61d820bab59547d2c319bcd0c20c99.jpg'
    }
    fetchImage(data);
  };

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
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
        <FormDropZone image={image} removeImage={removeImage} handleChange={handleChange} dragActive={dragActive} handleDrag={handleDrag} handleDrop={handleDrop}  />
        <label htmlFor="room" className={styles.label}>
          Room Type
        </label>
        <FormSelect options={roomOptions} name='room' placeholder='Room' />
        <label htmlFor="style" className={styles.label}>
          Style
        </label>
        <FormSelect options={styleOptions} name='style' placeholder='Style' />
        <label htmlFor="copies" className={styles.label}>
          Amount of copies
        </label>
        <input min={1} max={10} onChange={sliderChange} id="copies" name="copies" type="range" required className={styles.slider} />
        <button type='submit' disabled={fetching} className={`${primaryStyles.button} ${styles.button}`}>
          {fetching ? <ProgressBar
            height="40"
            width="60"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#252423'
            barColor = '#2e2e2e'
          /> : 'Render Images' }
        </button>
      </form>
    </div>
  );
}
