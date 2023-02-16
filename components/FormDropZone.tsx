import React from 'react'
import Image from 'next/image'
import UPLOAD from '../public/upload.svg';
import styles from '../styles/StagingForm.module.css'

export default function FormDropZone(
  {handleChange, image, removeImage, dragActive, handleDrag, handleDrop}: 
  {handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, image: string | undefined, 
  removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void, dragActive: boolean,
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
          {image !== undefined ? 
          <div className={styles.inputLabelInner}>
            <Image fill sizes='400px' style={{objectFit: 'cover'}} className={styles.image} src={image} alt="upload" />
            <button type='button' onClick={removeImage} className={styles.closeButton}>X</button>
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
