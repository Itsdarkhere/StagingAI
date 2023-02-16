'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import StagingTop from './StagingTop';
import AddForm from './AddForm';
import RemoveForm from './RemoveForm';

export default function StagingForm({fetchImage, fetching, clickMode, mode, setImage, originalImage}: 
  {fetchImage: (reqData: {room: string, style: string, image: string}) => void, fetching: boolean,
  clickMode: (mode: boolean) => void, mode: boolean, setImage: (image: string | undefined) => void,
  originalImage: string | undefined}) {
  const [dragActive, setDragActive] = useState(false);

  interface Option {
    value: string;
    label: string;
  }
  const roomOptions: Option[] = [
    { value: 'living room', label: 'Living room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'study room', label: 'Study room' },
    { value: 'home office', label: 'Home office' },
    { value: 'dining room', label: 'Dining room' },
    { value: 'bathroom', label: 'Bathroom' },
  ];

  const actionOptions: Option[] = [
    { value: 'remove', label: 'Remove' },
    { value: 'add', label: 'Add' },
  ];

  const furnitureOptions: Option[] = [
    { value: 'sofa', label: 'Sofa' },
    { value: 'chair', label: 'Chair' },
    { value: 'table', label: 'Table' },
  ];

  const styleOptions: Option[] = [
    { value: 'modern', label: 'Modern' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'midcentury modern', label: 'Midcentury modern' },
    { value: 'rustic', label: 'Rustic' },
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
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      setImage(url + filename + "?val=" + Math.random());
    }
  }

  // Remove image from state
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(undefined);
  }

  const validateForm = async (event: React.SyntheticEvent) => {
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
    fetchImage(data);
  };

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  }

  return (
    <div className={styles.stagingForm}>
      <StagingTop mode={mode} clickMode={clickMode} />
      {mode ? 
      <AddForm validateForm={validateForm} handleDrag={handleDrag} removeImage={removeImage} originalImage={originalImage}
      handleChange={handleChange} dragActive={dragActive} handleDrop={handleDrop} 
      roomOptions={roomOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} /> 
      : 
      <RemoveForm validateForm={validateForm} handleDrag={handleDrag} removeImage={removeImage} originalImage={originalImage}
      handleChange={handleChange} dragActive={dragActive} handleDrop={handleDrop} 
      actionOptions={actionOptions} furnitureOptions={furnitureOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} />}
    </div>
  );
}
