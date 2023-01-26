import React from 'react'
import Image from 'next/image'
import UPLOAD from '../public/upload.svg';
import FILE from '../public/file.svg';
import styles from '../styles/StagingForm.module.css'

export default function FormDropZone(
  {handleChange, image, dragActive, handleDrag, handleDrop}: 
  {handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, image: string | ArrayBuffer | null, dragActive: boolean,
  handleDrag: (e: React.DragEvent) => void, handleDrop: (e: React.DragEvent) => void}) {
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
    </>
  )
}
