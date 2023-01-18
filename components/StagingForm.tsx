'use client';

import React, { useCallback, useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import PrimaryButton from './PrimaryButton';

export default function StagingForm() {
  const [dragActive, setDragActive] = useState(false);
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
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
    }
  };

  return (
    <div className={styles.stagingForm}>
      <form
        className={styles.form}
        onDragEnter={handleDrag}
        action="/send-data"
        method="post"
      >
        <label htmlFor="input-file-upload" className={styles.label}>
          Your current interior
        </label>
        <input
          onChange={handleChange}
          className={styles.input}
          type="file"
          id="input-file-upload"
          multiple={false}
        />
        <label
          className={`${styles.inputLabel} ${dragActive ? 'drag_active' : ''}`}
          id="label-file-upload"
          htmlFor="input-file-upload"
        >
          <div className={styles.inputLabelInner}>
            <p>Drag and drop your file here or click to upload</p>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            className={styles.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <label htmlFor="room" className={styles.label}>
          Room type
        </label>
        <select className={styles.select} name="room" id="room">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
        </select>
        <label htmlFor="style" className={styles.label}>
          Style
        </label>
        <select className={styles.select} name="style" id="style">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
        </select>
        <label htmlFor="copies" className={styles.label}>
          Amount of copies
        </label>
        <select className={styles.select} name="copies" id="copies">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
        </select>
        <PrimaryButton text="Render" />
      </form>
    </div>
  );
}
