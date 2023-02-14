'use client';

import React, { useState } from 'react';
import styles from '../styles/StagingForm.module.css';
import StagingTop from './StagingTop';
import AddForm from './AddForm';
import RemoveForm from './RemoveForm';

export default function StagingForm({fetchImage, fetching, clickMode, mode, setImage, image}: 
  {fetchImage: (reqData: {room: string, style: string}) => void, fetching: boolean,
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
      // https://i.pinimg.com/474x/3e/61/d8/3e61d820bab59547d2c319bcd0c20c99.jpg
      // https://media.istockphoto.com/id/990278494/photo/empty-concrete-wall.jpg?b=1&s=612x612&w=0&k=20&c=CXzQ1BKVkZCiVDbLZFDK8j29FWU8FDcdsw1nhoIUMQ8=
      image: 'https://i.pinimg.com/474x/3e/61/d8/3e61d820bab59547d2c319bcd0c20c99.jpg'
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
      handleChange={handleChange} dragActive={dragActive} handleDrop={handleDrop} 
      roomOptions={roomOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} /> 
      : 
      <RemoveForm validateForm={validateForm} handleDrag={handleDrag} removeImage={removeImage} image={image}
      handleChange={handleChange} dragActive={dragActive} handleDrop={handleDrop} 
      actionOptions={actionOptions} furnitureOptions={furnitureOptions} styleOptions={styleOptions}
      sliderChange={sliderChange} fetching={fetching} />}
    </div>
  );
}
