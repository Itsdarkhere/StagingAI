import React from 'react';
import Image from 'next/image';
import UPLOAD from '../public/upload.svg';
import styles from '../styles/StagingForm.module.css';
import Spinner from './Spinner';

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
  return (
    <>
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
        className={`${styles.inputLabel} ${dragActive && styles.drag_active}`}
      >
        {image !== undefined && !uploadingPhoto ? (
          <div className={styles.inputLabelInner}>
            <Image
              fill
              sizes="400px"
              style={{ objectFit: 'cover' }}
              className={styles.image}
              src={image + "?" + Math.random()}
              alt="upload"
            />
            <button
              type="button"
              onClick={removeImage}
              className={styles.closeButton}
            >
              X
            </button>
          </div>
        ) : (
          <div className={styles.inputLabelInner}>
            {uploadingPhoto ? 
            <Spinner wh={45} white={true} />
            : 
            <>
              <Image src={UPLOAD} alt="upload" />
              <p className={styles.p}>
                Click to upload <br />
                <span className={styles.span}>or drag and drop it here</span>
              </p>
            </>}
          </div>
        )}
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
