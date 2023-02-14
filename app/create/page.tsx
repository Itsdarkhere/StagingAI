'use client'
import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React, { useState } from 'react';
import styles from '../../styles/Staging.module.css';


export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [img64, setImg] = useState(null);
  const [mode, setMode] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchImage = async (reqData: {room: string, style: string}) => {
    setFetching(true);
    try {
      const res = await fetch(`/api/text2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      const data = await res.json();
      setImg(data.data.modelOutputs[0].image_base64)
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  }

  const pix2pix = async (reqData: {room: string, style: string}) => {
    setFetching(true);
    try {
      const res = await fetch(`/api/pix2pix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      const data = await res.json();
      setImg(data.data.modelOutputs[0].image_base64)
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  }

  const img2img = async (reqData: {room: string, style: string}) => {
    setFetching(true);
    try {
      const res = await fetch(`/api/img2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      const data = await res.json();
      setImg(data.data.modelOutputs[0].image_base64)
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  }

  const clickMode = (mode: boolean) => {
    setMode(mode);
  }

  const setOriginalImage = (img: string | undefined) => {
    setImage(img);
  }

  return (
    <div className={styles.staging}>
      <StagingForm 
      fetchImage={img2img} fetching={fetching} clickMode={clickMode} 
      mode={mode} setImage={setOriginalImage} image={originalImage} />
      <StagingDisplay img64={img64} originalImage={originalImage} mode={mode} />
    </div>
  );
}
