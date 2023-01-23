'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import UPLOAD from "../public/upload.svg";
import Select from 'react-select';
import Image from 'next/image';
import PLUS from "../public/plus.svg";
import TRASH from "../public/trash.svg";

export default function StagingForm() {
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState(false);
  const options = [
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

  const clickMode = (mode: boolean) => {
    setMode(mode);
  }

  return (
    <div className={styles.stagingForm}>
      <div className={styles.formTop}>
        <button onClick={() => clickMode(true)} className={`${styles.topButton} ${mode && styles.selected}`}>
          <Image className={`${mode && styles.brightImage}`} src={PLUS} alt="plus" style={{marginRight: 5}} />
          Add
        </button>
        <button onClick={() => clickMode(false)} className={`${styles.topButton} ${!mode && styles.selected}`}>
          <Image className={`${!mode && styles.brightImage}`} src={TRASH} alt="trash" style={{marginRight: 5}} />
          Remove
        </button>
      </div>
      <form
        className={styles.form}
        onDragEnter={handleDrag}
        action="/send-data"
        method="post"
      >
        <label htmlFor="input-file-upload" className={styles.label}>
          Current interior
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
            <Image src={UPLOAD} alt="upload" />
            <p className={styles.p}>
              Click to upload <br /><span className={styles.span}>or drag and drop it here</span>
            </p>
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
        <Select
          options={options}
          placeholder="Room"
          styles={{
            container: (baseStyles, _) => ({
              ...baseStyles,
              width: '100%',
              height: "48px"
            }),
            placeholder: (baseStyles, _) => ({
              ...baseStyles,
              fontSize: "14px",
              color: '#ADADAD',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: '#2E2E2E',
              border: 'none',
              height: "48px",
              boxShadow: state.isFocused ? "0px 0px 6px #FFFFF" : "none",
              "&:focus": {
                boxShadow: 'none',
                border: "1px solid red",
                outline: "1px solid red",
              },
            }),
            indicatorSeparator: (baseStyles, _) => ({
              ...baseStyles,
              display: 'none',
            }),
            menu: (baseStyles, _) => ({
              ...baseStyles,
              marginTop: 0,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              neutral80: 'white',
            },
          })}
        />
        <label htmlFor="style" className={styles.label}>
          Style
        </label>
        <Select options={options}
        placeholder="Style"
        styles={{
          container: (baseStyles, _) => ({
            ...baseStyles,
            width: '100%',
            height: "48px"
          }),
          placeholder: (baseStyles, _) => ({
            ...baseStyles,
            fontSize: "14px",
            color: '#ADADAD',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#2E2E2E',
            height: "48px",
            border: 'none',
            boxShadow: state.isFocused ? "0px 0px 6px #FFFFF" : "none",
            "&:focus": {
              boxShadow: 'none',
              border: "1px solid red",
              outline: "1px solid red",
            },
          }),
          indicatorSeparator: (baseStyles, _) => ({
            ...baseStyles,
            display: 'none',
          }),
          menu: (baseStyles, _) => ({
            ...baseStyles,
            marginTop: 0,
          })
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral80: 'white',
          },
        })}
        />
        <label htmlFor="copies" className={styles.label}>
          Amount of copies
        </label>
        <input type="range" className={styles.slider} />
        <button className={`${primaryStyles.button} ${styles.button}`}>
          Render Images
        </button>
      </form>
    </div>
  );
}
