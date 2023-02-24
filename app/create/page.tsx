'use client'
import MultiForm from '@/components/MultiForm';
import StagingDisplay from '@/components/StagingDisplay';
import React, { useRef, useState } from 'react';
import { SingleValue } from 'react-select';
import styles from '../../styles/Staging.module.css';


export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mask, setMask] = useState<string | null>(null);
  const [action, setAction] = React.useState<string>('');
  const sketchRef = useRef<any>(null);
  const [img64, setImg] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const img2img = async (reqData: {room: string, style: string, image: string}) => {
    setFetching(true);
    console.log(reqData);
    try {
      const res = await fetch(`/api/img2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
      console.log("res: ", res);
      const data = await res.json();
      setImg('data:image/jpeg;base64,' + data.data.modelOutputs[0].image_base64)
      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
    }
  }

  const inpainting = async (reqData: {room: string, style: string, image: string, mask: string}) => {
    // setFetching(true);
    await setImgMask();
    // reqData.mask = mask!;
    // console.log(reqData.image);
    // console.log(mask);
    // try {
    //   const res = await fetch(`/api/inpainting`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(reqData),
    //   });
    //   console.log("res: ", res);
    //   const data = await res.json();
    //   setImg(data.data.modelOutputs[0].image_base64)
    //   setFetching(false);
    // } catch (err) {
    //   console.log(err);
    //   setFetching(false);
    // }
  }

  const dataUrlToFile = async (dataUrl: string): Promise<File> => {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], 'mask.png' + Math.random().toString, { type: 'image/png' });
  }

  const setImgMask = async () => {
    if (sketchRef.current !== null) {
        const maskDataUrl = await sketchRef.current.exportImage('png');
        const maskFile = await dataUrlToFile(maskDataUrl);
        await uploadMask(maskFile);
    }
  }

  const uploadMask = async (file: File) => {
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
      setMask(url + filename);
      setImg(url + filename);
      console.log("mask: ", url + filename);
    }
  }

  const setOriginalImage = (img: string | undefined) => {
    setImage(img);
  }

  const setStateAction = (event: SingleValue<{ value: string; label: string; }>) => {
    setAction(event!.value);
  }


  return (
    <div className={styles.staging}>
      <MultiForm 
        img2img={img2img} 
        inpainting={inpainting} 
        fetching={fetching} 
        setImage={setOriginalImage} 
        originalImage={originalImage} 
        action={action}
        setAction={setStateAction}
      />
      <StagingDisplay 
        sketchRef={sketchRef} 
        img64={img64} 
        originalImage={originalImage} 
        rendering={fetching} 
        action={action}
      />
    </div>
  );
}
