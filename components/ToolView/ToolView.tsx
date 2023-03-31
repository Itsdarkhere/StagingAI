'use client';
import MultiForm from '@/components/MultiForm';
import StagingDisplay from '@/components/StagingDisplay';
import React, { useRef, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import styles from '../../styles/Staging.module.css';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ToolView() {

  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<boolean>(false);
  const sketchRef = useRef<any>(null);
  const [prediction, setPrediction] = useState(null);
  const [renders, setRenders] = useState<string[]>([]);
  const [fetching, setFetching] = useState(false);

  const paintingAddKeyMap = new Map([
    ['bedroom9000.pt', 'A photo of a modern bedroom, _a1_a2_a3_a4_a5_a6 , natural light'],
    ['bedroom9800.pt', 'A photo of a modern bedroom, _b1_b2_b3_b4_b5_b6 , natural ligh'],
    ['boardroom6000.pt', 'A photo of a modern boardroom, table, chairs, _c1_c2_c3_c4_c5_c6_c7_c8'],
    ['boardroom10000.pt', 'A photo of a modern boardroom, table, chairs, _d1_d2_d3_d4_d5_d6_d7_d8'],
    ['empty5000.pt', 'Empty space, _e1_e2'],
    ['living6000.pt', 'A photo of a modern living room, natural light, _f1_f2_f3_f4_f5_f6'],
    ['living10000.pt', 'A photo of a modern living room, natural light, _g1_g2_g3_g4_g5_g6'],
    ['office10000.pt', 'A photo of a modern open office, _h1_h2_h3_h4_h5_h6_h7_h8_h9_h10_h11_h12_h13_h14_h15'],
    ['office13200.pt', 'A photo of a modern open office, _j1_j2_j3_j4_j5_j6_j7_j8_j9_j10_j11_j12_j13_j14_j15'],
    ['privateoffice8200.pt', 'a photo of an office, _i1_i2_i3_i4_i5_i6_i7_i8'],
    ['privateoffice10000.pt', 'a photo of an office, _k1_k2_k3_k4_k5_k6_k7_k8'],
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

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
    concept: string;
    copies: number;
  }) => {
    if (fetching) {
      return;
    }
    setFetching(true);
    // Set a new Empty render to show loading
    const loaderArr = Array.from({ length: reqData.copies }, () => 'load');
    setRenders([...loaderArr, ...renders]);
    // Add stuff to reqData
    reqData.concept = reqData.room
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
      console.log(prediction)
      prediction.output.forEach((img: string) => {
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
        prev.map((render: string) =>
          render === 'load' ? prediction.output : render
        )
      );
      setFetching(false);
    }
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
        setImage={setOriginalImage}
        upscale={(imgURL: string) => upscale(imgURL)}
      />
    </div>
  )
}
