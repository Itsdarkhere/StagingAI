'use client';
import MultiForm from '@/components/MultiForm';
import StagingDisplay from '@/components/StagingDisplay';
import React, { useRef, useState } from 'react';
import Modal from "react-modal"
import styles from '../styles/Staging.module.css';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<boolean>(true);
  const sketchRef = useRef<any>(null);
  const [prediction, setPrediction] = useState(null);
  const [img64, setImg] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const paintingAddKeyMap = new Map([
    ['office furniture', 'Office furniture, furnished, modern, standing desk, work, desks, chairs, tables, lamps, computers, monitors'],
    ['table', 'table'],
    ['sofa', 'sofa'],
    ['chair', 'chair'],
  ])

  const controlnet = async (reqData: {
    room: string;
    style: string;
    image: string;
  }) => {
    setFetching(true);
    const response = await fetch('/api/predictions/control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log("Error:", prediction.detail);
      setFetching(false);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      // Check status every second
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        console.log("Error:", prediction.detail);
        setFetching(false);
        return;
      }
      setPrediction(prediction);
    }
    // After completion, set the image
    setImg(prediction.output[1]);
    setFetching(false);
  };

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
  }) => {
    setFetching(true);
    reqData.room = paintingAddKeyMap.get(reqData.room)!;
    reqData.mask = await setImgMask();
    const response = await fetch('/api/predictions/inpainting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log("Error:", prediction.detail);
      setFetching(false);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      // Check status every second
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        console.log("Error:", prediction.detail);
        setFetching(false);
        return;
      }
      setPrediction(prediction);
    }
    console.log(prediction);
    // After completion, set the image
    setImg(prediction.output[0]);
    setFetching(false);
  };

  const upscale = async () => {
    setFetching(true);
    const reqData = {
      image: img64,
      scale: 4,
    }
    const response = await fetch('/api/predictions/upscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log("Error:", prediction.detail);
      setFetching(false);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      // Check status every second
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        console.log("Error:", prediction.detail);
        setFetching(false);
        return;
      }
      setPrediction(prediction);
    }
    console.log(prediction);
    // After completion, set the image
    setImg(prediction.output);
    setFetching(false);
  }

  const dataUrlToFile = async (dataUrl: string): Promise<File> => {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], 'mask.png', {
      type: 'image/png',
    });
  };

  const setImgMask = async () => {
    if (sketchRef.current !== null) {
      const maskDataUrl = await sketchRef.current.exportImage('png');
      const maskBlob =  await dataUrlToFile(maskDataUrl);
      return await uploadMask(maskBlob);
    }
    return '';
  };

  const uploadMask = async (file: File) => {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    // Generates a presigned POST
    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
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
      return url + filename;
    }
    return '';
  };

  const setOriginalImage = (img: string | undefined) => {
    setImage(img);
  };

  const clickMode = (mode: boolean) => {
    setImg(null);
    setMode(mode);
  } 

  return (
    <div className={styles.staging} id="tool">
      <MultiForm
        img2img={controlnet}
        inpainting={inpainting}
        fetching={fetching}
        setImage={setOriginalImage}
        originalImage={originalImage}
        mode={mode}
        setMode={clickMode}
      />
      <StagingDisplay
        sketchRef={sketchRef}
        img64={img64}
        originalImage={originalImage}
        rendering={fetching}
        mode={mode}
        upscale={upscale}
      />
    </div>
  );
}
