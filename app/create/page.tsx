'use client'
import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React, { useRef, useState } from 'react';
import styles from '../../styles/Staging.module.css';


export default function Create() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mask, setMask] = useState<string | null>(null);
  const sketchRef = useRef<any>(null);
  const [img64, setImg] = useState(null);
  const [fetching, setFetching] = useState(false);

  const img2img = async (reqData: {room: string, style: string, image: string}) => {
    setFetching(true);
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
      setImg(data.data.modelOutputs[0].image_base64)
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

  const setImgMask = async () => {
    if (sketchRef.current !== null) {
        const maskPng = await sketchRef.current.exportImage('png');
        console.log("maskPng: ", maskPng);
        setImg(maskPng);
        await uploadPhoto(maskPng);
    }
  }

  const uploadPhoto = async (file: File) => {
    const filename = encodeURIComponent('mask.png');
    const fileType = encodeURIComponent('image/png');

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
      console.log("mask: ", url + filename);
    }
  }

  const setOriginalImage = (img: string | undefined) => {
    setImage(img);
  }


  return (
    <div className={styles.staging}>
      <StagingForm 
      img2img={img2img} inpainting={inpainting} fetching={fetching} setImage={setOriginalImage} originalImage={originalImage} />
      <StagingDisplay sketchRef={sketchRef} img64={img64} originalImage={originalImage} rendering={fetching} />
    </div>
  );
}
