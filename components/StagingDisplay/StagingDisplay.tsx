/* eslint-disable @next/next/no-img-element */
'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styles from '../../styles/ToolView/StagingDisplay/StagingDisplay.module.css';
import Modal from '../Modal/Modal';
import NewRender from '../NewRender';
import ImageOptions from './ImageOptions/ImageOptions';
import { useSession } from 'next-auth/react';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function StagingDisplay() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIMG, setModalIMG] = useState<string>('');
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<string>('inpainting');
  const sketchRef = useRef<any>(null);
  const [prediction, setPrediction] = useState(null);
  const [renders, setRenders] = useState<string[]>([]);
  const [fetching, setFetching] = useState(false);
  const session = useSession();

  const paintingAddKeyMap = new Map([
    ['bedroom9800.pt', 'A photo of a modern bedroom, natural light'],
    [
      'dining',
      'A high resolution photo of a modern dining room, interior design magazine, sun light',
    ],
    [
      'boardroom10000.pt',
      'A photo of a modern boardroom, table, chairs, <your-chosen-concept>',
    ],
    ['empty5000.pt', 'Empty space'],
    ['wall', 'An empty plain wall, paint'],
    ['wallOffice', 'A high resolution photo of a modern office'],
    [
      'living10000.pt',
      'A high resolution photo of a modern minimalist living room, <your-chosen-concept> , interior design magazine, sun light',
    ],
    [
      'office',
      'Sleek and minimalist open-concept office with large windows, natural light, and ergonomic furniture.',
    ],
    ['bluesky', 'A beautiful blue sky.'],
    [
      'privateoffice10000.pt',
      'a high resolution photo of a modern minimalist office, desk and chair, personal office',
    ],
  ]);

  // Still needs to have copies hooked in
  const controlnet = async (reqData: {
    room: string;
    style: string;
    image: string;
    copies: number;
  }) => {
    if (fetching) {
      return;
    }
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
      prediction.output.forEach((img: string, index: number) => {
        // 1st in controlnet is the scribble
        if (index === 0) return;
        setRenders((prev: string[]) => {
          const index = prev.findIndex((render: string) => render === 'load');
          if (index !== -1) {
            const updatedRenders = [...prev];
            updatedRenders[index] = img;
            return updatedRenders;
          }
          return prev;
        });
      });
      setFetching(false);
    }
  };

  const dream = async (imageUrl: string, width: number, height: number) => {
    if (fetching) {
      return;
    }
    setRenders(['load', ...renders]);
    setFetching(true);

    // Get mask
    const mask = await setImgMask();
    // Resize Mask and Image
    const resizedIMG = await fetch(
      `/api/images/resize?imageUrl=${imageUrl}&width=${width}&height=${height}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/*',
        },
      }
    );

    const resizedMask = await fetch(
      `/api/images/resize?imageUrl=${mask}&width=${width}&height=${height}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/*',
        },
      }
    );

    // Get binary data and content type
    const resizedIMGBuffer = await resizedIMG.arrayBuffer();
    const resizedIMGContentType = resizedIMG.headers.get('Content-Type');
    const resizedMaskBuffer = await resizedMask.arrayBuffer();
    const resizedMaskContentType = resizedMask.headers.get('Content-Type');

    // Append data to inference request
    const formData = new FormData();
    formData.append(
      'init_image',
      new Blob([resizedIMGBuffer], { type: resizedIMGContentType! })
    );
    formData.append(
      'mask_image',
      new Blob([resizedMaskBuffer], { type: resizedMaskContentType! })
    );
    formData.append('mask_source', 'MASK_IMAGE_BLACK');
    formData.append(
      'text_prompts[0][text]',
      'A photo of a modern bedroom, natural light'
    );

    // Set API host, engine ID, and API key
    const apiHost = 'https://api.stability.ai';
    const engineId = 'stable-diffusion-xl-beta-v2-2-2';
    const apiKey = 'sk-jeYJ5D78tIaD5zRwpFGzw3uptZMUqyWq3Gx14Ocgzq4Egrwa';

    // Send the inference request
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image/masking`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    ).then((res) => res.json());

    console.log(response);
    const artifact = response.artifacts[0].base64;
    const imageSrc = 'data:image/png;base64,' + artifact;

    setRenders((prev: string[]) =>
      prev.map((render: string) => (render === 'load' ? imageSrc : render))
    );

    setFetching(false);
  };

  const enhance = async (imageUrl: string, width: number, height: number) => {
    if (fetching) {
      return;
    }
    setRenders(['load', ...renders]);
    setFetching(true);

    // Resize the Image
    const resizedIMG = await fetch(
      `/api/images/resize?imageUrl=${imageUrl}&width=${width}&height=${height}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/*',
        },
      }
    );

    // Get binary data and content type
    const resizedIMGBuffer = await resizedIMG.arrayBuffer();
    const resizedIMGContentType = resizedIMG.headers.get('Content-Type');

    // Append data to inference request
    const formData = new FormData();
    formData.append(
      'init_image',
      new Blob([resizedIMGBuffer], { type: resizedIMGContentType! })
    );
    formData.append('style_preset', 'enhance');
    formData.append('text_prompts[0][text]', 'Natural light');
    formData.append('image_strength', '0.99');

    // Set API host, engine ID, and API key
    const apiHost = 'https://api.stability.ai';
    const engineId = 'stable-diffusion-xl-beta-v2-2-2';
    const apiKey = 'sk-jeYJ5D78tIaD5zRwpFGzw3uptZMUqyWq3Gx14Ocgzq4Egrwa';

    // Send the inference request
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    ).then((res) => res.json());

    console.log(response);
    const artifact = response.artifacts[0].base64;
    const imageSrc = 'data:image/png;base64,' + artifact;

    // Replace loader with the resulting image
    setRenders((prev: string[]) =>
      prev.map((render: string) => (render === 'load' ? imageSrc : render))
    );

    setFetching(false);
  };

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string | undefined;
    concept: string;
    copies: number;
    width: number;
    height: number;
  }) => {
    if (fetching) {
      return;
    }
    setFetching(true);

    // Set a new Empty render to show loading
    const loaderArr = Array.from({ length: reqData.copies }, () => 'load');
    setRenders([...loaderArr, ...renders]);

    // Add stuff to reqData
    reqData.concept = reqData.room;
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

    // Upload this into rds
    const imageURLS = prediction.output;

    // After completion, override the previously empty render with the image
    if (prediction) {
      prediction.output.forEach((img: string) => {
        setRenders((prev: string[]) => {
          // Find all 'load' and replace with the image
          const index = prev.findIndex((render: string) => render === 'load');
          if (index !== -1) {
            const updatedRenders = [...prev];
            updatedRenders[index] = img;
            return updatedRenders;
          }
          return prev;
        });
      });
      setFetching(false);
    }

    imageURLS.forEach((url: string) => {
      // Upload the upscaled image to s3
      uploadS3FromURL(url);
    })
  };

  const saveURLs = async (urls: string[]) => {
    if (!session?.data?.user?.id) return;
    const userId = session.data.user.id;
    // Store images w userId
    const reqData = {
      urls,
      userId,
    };

    const response = await fetch('/api/images/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });

    // Check status
    if (response.ok) {
      console.log('Successfully saved images on postgres');
    } else {
      console.log('Failed to save images on postgres');
    }
  };

  // TODO check if this works
  const removeFromRenders = () => {
    setRenders((prev: string[]) =>
      prev.filter((render: string) => render !== 'load')
    );
  };

  const upscale = async (imageURL: string) => {
    if (fetching) {
      return;
    }
    setFetching(true);
    setRenders(['load', ...renders]);
    const reqData = {
      image: imageURL,
      scale: 2,
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
        prev.map((render: string) =>
          render === 'load' ? prediction.output : render
        )
      );
      setFetching(false);
    }

    // Upload the upscaled image to s3
    uploadS3FromURL(prediction.output);
  };

  const getInferenceStatus = async (response: any, removeCount: number) => {
    let prediction = await response.json();
    if (response.status !== 201) {
      inferenceError(prediction.detail);
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
        inferenceError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
    return prediction;
  };

  const inferenceError = (detail: string) => {
    console.log('Error:', detail);
    removeFromRenders();
    setFetching(false);
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
      const maskBlob = await dataUrlToFile(maskDataUrl);
      return await uploadMask(maskBlob);
    }
    return '';
  };

  const uploadMask = async (file: File) => {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
    if (!session?.data?.user?.id) return;
    const userId = session.data.user.id;

    
    // Masks and images the user uploads go here
    const directory = 'uploads'
    // Generates a presigned POST
    const res = await fetch(
      `/api/images/upload?file=${filename}&fileType=${fileType}&userId=${userId}&dir=${directory}`
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
      // BucketURL/ + userId/ + filename
      return url + userId + '/' + directory + '/' + filename;
    }
    return '';
  };

  const uploadS3FromURL = async (imageUrl: string) => {
    // Extract the filename and file extension
    const urlParts = imageUrl.split('/');
    const fileName = encodeURIComponent(urlParts[urlParts.length - 1]);
  
    if (!session?.data?.user?.id) return;
    const userId = session.data.user.id;
  
    // Download the image file
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileType = encodeURIComponent(blob.type);
  
    // Masks and images the user uploads go here
    const directory = 'generations';
    // Generates a presigned POST
    const res = await fetch(
      `/api/images/upload?file=${fileName}&fileType=${fileType}&userId=${userId}&dir=${directory}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();
  
    Object.entries({ ...fields, file: blob }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  
    if (upload.ok) {
      // BucketURL/ + userId/ + directory/ + fileName
      saveURLs([url + userId + '/' + directory + '/' + fileName]);
    }
    return '';
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (imgURL: string) => {
    setModalIMG(imgURL);
    setModalOpen(true);
  };

  return (
    <div className={styles.stagingDisplay}>
      {/* Image popup */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal handleClose={closeModal} img={modalIMG} />}
      </AnimatePresence>
      {/* Image and options */}
      <ImageOptions
        mode={mode}
        originalImage={originalImage}
        sketchRef={sketchRef}
        fetching={fetching}
        inpainting={inpainting}
        dream={dream}
        enhance={enhance}
        setImage={setImage}
      />
      {/* Resulting Images */}
      <div className={styles.maskBox}>
        {renders.map((img, i) => {
          return (
            <NewRender
              fetching={fetching}
              prediction={prediction}
              setImage={setImage}
              key={i}
              image={img}
              upscale={() => upscale(img)}
              openModal={(imgURL: string) => openModal(imgURL)}
            />
          );
        })}
      </div>
    </div>
  );
}
