'use client';
import MultiForm from '@/components/MultiForm';
import StagingDisplay from '@/components/StagingDisplay';
import React, { useRef, useState } from 'react';
import { SingleValue } from 'react-select';
import styles from '../../styles/Staging.module.css';

export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<boolean>(true);
  const sketchRef = useRef<any>(null);
  const [img64, setImg] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const img2img = async (reqData: {
    room: string;
    style: string;
    image: string;
  }) => {
    setFetching(true);
    try {
      const res = await fetch(`/api/img2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      console.log('res: ', res);
      const data = await res.json();
      setImg(
        'data:image/jpeg;base64,' + data.data.modelOutputs[0].image_base64
      );
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  };

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
  }) => {
    setFetching(true);
    reqData.mask = await setImgMask();
    console.log("Mask: ", reqData.mask);
    try {
      const res = await fetch(`/api/inpainting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      console.log('res: ', res);
      const data = await res.json();
      setImg('data:image/jpeg;base64,' + data.data.modelOutputs[0].image_base64);
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  };

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
      const maskFile = await dataUrlToFile(maskDataUrl);
      return await uploadMask(maskFile);
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
  } 

  return (
    <div className={styles.staging}>
      <MultiForm
        img2img={img2img}
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
      />
    </div>
  );
}
