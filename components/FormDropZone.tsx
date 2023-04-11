import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UPLOAD from '../public/upload.svg';
import IMGUP from "../public/imageup.svg"
import styles from '../styles/FormDropZone.module.css';
import Spinner from './Spinner';
import { Button } from "@mui/material"

export default function FormDropZone({
  uploadingPhoto,
  handleChange,
  image,
  removeImage,
  dragActive,
  handleDrag,
  handleDrop,
}: {
  uploadingPhoto: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: string | undefined;
  removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [image]);
  return (
    <>
      {/* <input
        onChange={handleChange}
        className={styles.input}
        type="file"
        accept="image/*"
        id="input-file-upload"
        name="input-file-upload"
        required={image ? false : true}
        multiple={false}
      /> */}
      <label
        htmlFor="input-file-upload"
        className={`${styles.inputLabel} ${dragActive && styles.drag_active}`}
      >
        <div className={styles.inputLabelInner}>
          {!uploadingPhoto && image !== undefined && (
            <Image
              fill
              onLoad={() => setLoaded(true)}
              sizes="400px"
              style={{ objectFit: 'cover' }}
              className={`${styles.image} ${loaded && styles.loaded}`}
              src={image + '?' + Math.random()}
              alt="upload"
            />
          )}
          {uploadingPhoto || (image !== undefined && !loaded) && <Spinner wh={45} white={true} />}

          {image === undefined && !uploadingPhoto && (
            <>
              <Image height={75} src={IMGUP} alt="upload" />
              <p className={styles.p}>
                Drag your image here to start uploading
              </p>
              <p className={styles.span}>───── OR ─────</p>
              <Button variant="contained" 
              component="label"
              style={{marginTop: 15, textTransform: 'none', 
              backgroundColor: 'rgb(99, 102, 241)', height: 40,
              paddingLeft: 25, paddingRight: 25}}>Browse files
                <input hidden accept="image/*" multiple={false} onChange={handleChange} type="file"
                name="input-file-upload"
                required={image ? false : true} />
              </Button>
            </>
          )}

          {!uploadingPhoto && loaded && (
            <button
              type="button"
              onClick={removeImage}
              className={styles.closeButton}
            >
              X
            </button>
          )}
        </div>
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
    </>
  );
}
