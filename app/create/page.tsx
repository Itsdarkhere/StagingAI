'use client'
import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React from 'react';
import styles from '../../styles/Staging.module.css';

export default function Create() {
  const [imageSrc, setImageSrc] = React.useState('');

  const fetchImage = async () => {
    const data = {
      prompt: "bento box inside a japanese restaurant",
      guidance_scale: 7.5,
      height: 512,
      width: 512,
      num_inference_steps: 50,
      safety_check: true,
      seed: 0
    }

    const JSONdata = JSON.stringify(data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }

    fetch('http://16.170.242.177/txt2img', options)
    .then(response => response.blob())
    .then((blob) => setImageSrc(URL.createObjectURL(blob)));
  }
  return (
    <div className={styles.staging}>
      <StagingForm fetchImage={fetchImage} />
      <StagingDisplay image={imageSrc}/>
    </div>
  );
}
