import React, { useState } from 'react'
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

export default function MultiForm({img2img, inpainting, fetching, setImage, originalImage, action, setAction}: 
  {img2img: (reqData: {room: string, style: string, image: string}) => void,
  inpainting: (reqData: {room: string, style: string, image: string, mask: string}) => void, fetching: boolean,
  setImage: (image: string | undefined) => void, originalImage: string | undefined,
  action: string, setAction: (event: SingleValue<{ value: string; label: string; }>) => void}) {

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
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Upload image to S3
      await uploadPhoto(file);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]!;
    // Upload image to S3
    await uploadPhoto(file);
    e.target.value = "";
  };

  const uploadPhoto = async (file: File) => {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    // Generates a presigned POST
    const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
      console.log(key, value as string);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      setImage(url + filename);
    }
  }

  // Remove image from state
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(undefined);
  }

  const validateForm1 = async (event: React.SyntheticEvent) => {
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
      image: originalImage!
    }
    img2img(data);
  };

  const validateForm2 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    const target = event.target as typeof event.target & {
      action: { value: string };
      style: { value: string };
    };

    const data = {
      room: target.action.value,
      style: target.style.value,
      image: originalImage!,
      mask: ''
    }
    inpainting(data);
  }

  const validateBasedOnAction = (event: React.SyntheticEvent) => {
    switch (action) {
      case 'furnish':
        // Send to IMG2MG API
        validateForm1(event);
        break;
      case 'replace':
      case 'remove':
      case 'add':
        // Send to Inpainting API
        validateForm2(event);
        break;
      default:
        return;
    }
  }

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  }

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
    <div className={styles.stagingForm}>
      <form
          onSubmit={(e) => validateBasedOnAction(e)}
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
          <FormSelect options={actionOptions} onChange={setAction} hasOnChange={true} name='action' placeholder='Furnish' />
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
      </div>
  )
}
