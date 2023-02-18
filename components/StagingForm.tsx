'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import MultiForm from './MultiForm';

export default function StagingForm({img2img, inpainting, fetching, setImage, originalImage}: 
  {img2img: (reqData: {room: string, style: string, image: string}) => void,
  inpainting: (reqData: {room: string, style: string, image: string, mask: string}) => void, fetching: boolean,
  setImage: (image: string | undefined) => void,
  originalImage: string | undefined}) {
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

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  }

  return (
    <div className={styles.stagingForm}>
      <MultiForm validateForm={validateForm2} handleDrag={handleDrag} removeImage={removeImage} originalImage={originalImage}
      handleChange={handleChange} dragActive={dragActive} handleDrop={handleDrop}
      sliderChange={sliderChange} fetching={fetching} />
    </div>
  );
}
