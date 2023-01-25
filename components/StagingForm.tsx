'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import UPLOAD from '../public/upload.svg';
import Select from 'react-select';
import Image from 'next/image';
import PLUS from '../public/plus.svg';
import TRASH from '../public/trash.svg';
import FILE from "../public/file.svg";

export default function StagingForm({fetchImage}: {fetchImage: () => void}) {
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
    console.log("VALIDATING");
    event.preventDefault();
    if (fetching) {
      return;
    }

    setFetching(true);
    // const target = event.target as typeof event.target & {
    //   room: { value: string };
    //   style: { value: string };
    //   copies: { value: number };
    // };

    // const data = {
    //   room: target.room.value,
    //   style: target.style.value,
    //   copies: target.copies.value.toString(),
    //   image: image!,
    // }

    // const JSONdata = JSON.stringify(data);

    // // Endpoint
    // const endpoint = "/api/form";

    // Fill the above steps to the data object
    fetchImage();
    
    setFetching(false);
  };

  return (
    <div className={styles.stagingForm}>
      <div className={styles.formTop}>
        <button
          onClick={() => clickMode(true)}
          className={`${styles.topButton} ${mode && styles.selected}`}
        >
          <Image
            className={`${mode && styles.brightImage}`}
            src={PLUS}
            alt="plus"
            style={{ marginRight: 5 }}
          />Add
        </button>
        <button
          onClick={() => clickMode(false)}
          className={`${styles.topButton} ${!mode && styles.selected}`}
        >
          <Image
            className={`${!mode && styles.brightImage}`}
            src={TRASH}
            alt="trash"
            style={{ marginRight: 5 }}
          />
          Remove
        </button>
      </div>
      <form
        onSubmit={(e) => validateForm(e)}
        className={styles.form}
        onDragEnter={handleDrag}
      >
        <label htmlFor="input-file-upload" className={styles.label}>
          Current Interior
        </label>
        <input
          onChange={handleChange}
          className={styles.input}
          type="file"
          accept="image/*"
          id="input-file-upload"
          name="input-file-upload"
          required={image ? false : true}
          multiple={false}
        />
        <label
          htmlFor="input-file-upload"
          className={`${styles.inputLabel} ${dragActive && styles.drag_active}`}>
          {image ? 
          <div className={styles.inputLabelInner}>
            <Image height={40} src={FILE} alt="upload" />
            <p className={styles.pTwo}>
              Image uploaded...
            </p>
          </div> 
          : 
          <div className={styles.inputLabelInner}>
            <Image src={UPLOAD} alt="upload" />
            <p className={styles.p}>
              Click to upload <br />
              <span className={styles.span}>or drag and drop it here</span>
            </p>
          </div>
          }
          
        </label>
        {dragActive && (
          <div
            className={styles.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <label htmlFor="room" className={styles.label}>
          Room Type
        </label>
        <Select
          placeholder="Room"
          options={options}
          id="room"
          instanceId="room"
          name='room'
          required
          styles={{
            container: (baseStyles, _) => ({
              ...baseStyles,
              width: '100%',
              height: '48px',
            }),
            placeholder: (baseStyles, _) => ({
              ...baseStyles,
              fontSize: '14px',
              color: '#ADADAD',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: '#2E2E2E',
              border: 'none',
              height: '48px',
              boxShadow: state.isFocused ? '0px 0px 6px #FFFFF' : 'none',
              '&:focus': {
                boxShadow: 'none',
                border: '1px solid red',
                outline: '1px solid red',
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
        <Select
          options={options}
          placeholder="Style"
          id="style"
          instanceId="style"
          name='style'
          required
          styles={{
            container: (baseStyles, _) => ({
              ...baseStyles,
              width: '100%',
              height: '48px',
            }),
            placeholder: (baseStyles, _) => ({
              ...baseStyles,
              fontSize: '14px',
              color: '#ADADAD',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: '#2E2E2E',
              height: '48px',
              border: 'none',
              boxShadow: state.isFocused ? '0px 0px 6px #FFFFF' : 'none',
              '&:focus': {
                boxShadow: 'none',
                border: '1px solid red',
                outline: '1px solid red',
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
        <label htmlFor="copies" className={styles.label}>
          Amount of copies
        </label>
        <input min="1" max="10" id="copies" name="copies" type="range" required className={styles.slider} />
        <button type='submit' className={`${primaryStyles.button} ${styles.button}`}>
          Render Images
        </button>
      </form>
    </div>
  );
}
