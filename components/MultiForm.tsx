import React from 'react'
import { ProgressBar } from 'react-loader-spinner'
import FormDropZone from './FormDropZone'
import FormSelect from './FormSelect'
import styles from '../styles/StagingForm.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import FormFurnish from './FormFurnish';
import { SingleValue } from 'react-select';
import FormReplace from './FormReplace';
import FormRemove from './FormRemove';
import FormAdd from './FormAdd';

export default function MultiForm(
    { validateForm, handleDrag, removeImage, originalImage, handleChange, dragActive, 
    handleDrop, fetching, sliderChange}: 
    {validateForm: (e: React.FormEvent<HTMLFormElement>) => void, handleDrag: (e: React.DragEvent) => void,
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void, originalImage: string | undefined,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, dragActive: boolean,
    handleDrop: (e: React.DragEvent) => void, fetching: boolean, sliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const [action, setAction] = React.useState<string>('');

  interface Option {
    value: string;
    label: string;
  }
    
  const actionOptions: Option[] = [
    { value: 'furnish', label: 'Furnish (entire image)' },
    { value: 'replace', label: 'Replace (part of image)' },
    { value: 'remove', label: 'Remove (part of image)' },
    { value: 'add', label: 'Add (part of image)' },
  ];

  const onActionChange = (event: SingleValue<{ value: string; label: string; }>) => {
    setAction(event!.value);
  }

  const getFormInners = () => {
    switch (action) {
      case 'furnish':
        return <FormFurnish />;
      case 'replace':
        return <FormReplace />;
      case 'remove':
        return <FormRemove />;
      case 'add':
        return <FormAdd />;
      default:
        return;
    }
  }

  return (
    <form
        onSubmit={(e) => validateForm(e)}
        className={styles.form}
        onDragEnter={handleDrag}
      >
        <label htmlFor="input-file-upload" className={styles.label}>
          Current Interior
        </label>
        <FormDropZone image={originalImage} removeImage={removeImage} handleChange={handleChange} dragActive={dragActive} handleDrag={handleDrag} handleDrop={handleDrop}  />
        <label htmlFor="room" className={styles.label}>
          Action
        </label>
        <FormSelect options={actionOptions} onChange={onActionChange} hasOnChange={true} name='action' placeholder='Furnish' />
        {getFormInners()}
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
