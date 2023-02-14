import React from 'react'
import { ProgressBar } from 'react-loader-spinner'
import FormDropZone from './FormDropZone'
import FormSelect from './FormSelect'
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';

export default function AddForm(
    { validateForm, handleDrag, removeImage, image, handleChange, dragActive, 
    handleDrop, fetching, sliderChange, roomOptions, styleOptions}: 
    {validateForm: (e: React.FormEvent<HTMLFormElement>) => void, handleDrag: (e: React.DragEvent) => void,
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void, image: string | undefined,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, dragActive: boolean,
    handleDrop: (e: React.DragEvent) => void, fetching: boolean, sliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    roomOptions: {value: string, label: string}[], styleOptions: {value: string, label: string}[]}) {
  return (
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
  )
}