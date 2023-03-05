'use client';
import MultiForm from '@/components/MultiForm';
import StagingDisplay from '@/components/StagingDisplay';
import React, { useRef, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import styles from '../styles/Staging.module.css';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<boolean>(false);
  const sketchRef = useRef<any>(null);
  const [prediction, setPrediction] = useState(null);
  const [renders, setRenders] = useState<string[]>([]);
  const [fetching, setFetching] = useState(false);

  const paintingAddKeyMap = new Map([
    [
      'office furniture',
      'Office furniture, furnished, modern, standing desk, work, desks, chairs, tables, lamps, computers, monitors',
    ],
    ['table', 'table'],
    ['sofa', 'sofa'],
    ['chair', 'chair'],
  ]);

  // Still needs to have copies hooked in
  const controlnet = async (reqData: {
    room: string;
    style: string;
    image: string;
  }) => {
    setFetching(true);
    // Send the inference request
    const response = await fetch('/api/predictions/control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    // Check status until completion
    const prediction = await getInferenceStatus(response, 1);
    // After completion, set the image
    if (prediction) {
      setRenders([prediction.output[1], ...renders]);
      prediction.output.forEach((img: string, index: number) => {
        // 1st in controlnet is the scribble
        if (index === 0) return;
        setRenders((prev: string[]) => 
          prev.map((render: string) => (render === 'load' ? img : render))
        );
      });
      setFetching(false);
    }
  };

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
    copies: number;
  }) => {
    setFetching(true);
    // Set a new Empty render to show loading
    const loaderArr = Array.from({ length: reqData.copies }, () => 'load');
    setRenders([...loaderArr, ...renders]);
    // Add stuff to reqData
    reqData.room = paintingAddKeyMap.get(reqData.room)!;
    reqData.mask = await setImgMask();
    // Send inference request
    const response = await fetch('/api/predictions/inpainting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    // Check status until completion
    const prediction = await getInferenceStatus(response, loaderArr.length);
    // After completion, override the previously empty render with the image
    if (prediction) {
      prediction.output.forEach((img: string) => {
        setRenders((prev: string[]) => 
          prev.map((render: string) => (render === 'load' ? img : render))
        );
      });
      setFetching(false); 
    }
  };

  // TODO check if this works
  const removeFromRenders = (amountToRemove: number) => {
    const removeArr = Array.from(
      { length: amountToRemove },
      (_, index) => index
    );
    const newRenders = renders.filter((_, i) => removeArr.includes(i));
    setRenders(newRenders);
  };

  const upscale = async (imageURL: string) => {
    setFetching(true);
    setRenders(['load', ...renders]);
    const reqData = {
      image: imageURL,
      scale: 4,
    };
    // Send the inference request
    const response = await fetch('/api/predictions/upscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    // Check status until completion
    const prediction = await getInferenceStatus(response, 1);
    // After completion, override the previously empty render with the image
    if (prediction) {
      setRenders((prev: string[]) => 
        prev.map((render: string) => (render === 'load' ? prediction.output : render))
      );
      setFetching(false);
    }
  };

  const getInferenceStatus = async (response: any, removeCount: number) => {
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log('Error:', prediction.detail);
      removeFromRenders(removeCount);
      setFetching(false);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        console.log('Error:', prediction.detail);
        removeFromRenders(removeCount);
        setFetching(false);
        return;
      }
      setPrediction(prediction);
    }
    return prediction;
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
      const maskBlob = await dataUrlToFile(maskDataUrl);
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
    setMode(mode);
  };

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
        fetching={fetching}
        renders={renders}
        prediction={prediction}
        originalImage={originalImage}
        mode={mode}
        upscale={(imgURL: string) => upscale(imgURL)}
      />
    </div>
  );
}
