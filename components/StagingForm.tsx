'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import StagingTop from './StagingTop';
import AddForm from './AddForm';
import RemoveForm from './RemoveForm';

export default function StagingForm({fetchImage, fetching, clickMode, mode, setImage, image}: 
  {fetchImage: (reqData: {room: string, style: string, image: string}) => void, fetching: boolean,
  clickMode: (mode: boolean) => void, mode: boolean, setImage: (image: string | undefined) => void,
  image: string | undefined}) {
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
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(e.dataTransfer.files[0]); 
      reader.onload = function() {
        let blob = new Blob([reader.result as ArrayBuffer]);
        let url = URL.createObjectURL(blob);
        setImage(url);
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]); 
      reader.onload = function() {
        let blob = new Blob([reader.result as ArrayBuffer]);
        let url = URL.createObjectURL(blob);
        setImage(url);
        e.target.value = "";
      }
    }
  };

  // Upload image to S3
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]!;
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

    console.log(url + filename);
    setImage(url + filename);

    if (upload.ok) {
      console.log('Upload success');
    } else {
      console.error('Upload error');
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
      image: image!
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
      <AddForm validateForm={validateForm} handleDrag={handleDrag} removeImage={removeImage} image={image}
      handleChange={uploadPhoto} dragActive={dragActive} handleDrop={handleDrop} 
      roomOptions={roomOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} /> 
      : 
      <RemoveForm validateForm={validateForm} handleDrag={handleDrag} removeImage={removeImage} image={image}
      handleChange={uploadPhoto} dragActive={dragActive} handleDrop={handleDrop} 
      actionOptions={actionOptions} furnitureOptions={furnitureOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} />}
    </div>
  );
}
