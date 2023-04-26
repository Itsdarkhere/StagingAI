'use client';
import StagingDisplay from '@/components/ToolView/StagingDisplay/StagingDisplay';
import React, { useRef, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import styles from '../../styles/Staging.module.css';
import SideNav from '../SideNav';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ToolView({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const [mode, setMode] = React.useState<string>('inpainting');
  const sketchRef = useRef<any>(null);
  const [prediction, setPrediction] = useState(null);
  const [renders, setRenders] = useState<string[]>([]);
  const [fetching, setFetching] = useState(false);

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
      'office13200.pt',
      'a high resolution photo of a modern office, office design, 2022, interior design magazine',
    ],
    [
      'office2',
      'Sleek and minimalist open-concept office with large windows, natural light, and ergonomic furniture.',
    ],
    [
      'office3',
      'Spacious modern office with a blend of industrial and natural elements, featuring exposed brick walls, wooden beams, and plenty of greenery',
    ],
    [
      'office4',
      'Contemporary office space with collaborative workstations, colorful accents, and designated breakout areas for relaxation and brainstorming.',
    ],
    [
      'office5',
      'Futuristic office design incorporating cutting-edge technology, flexible workspaces, and interactive digital displays.',
    ],
    [
      'office6',
      'Modern office with a mix of private offices, glass-walled meeting rooms, and open workspaces for enhanced collaboration and productivity.',
    ],
    [
      'office7',
      'Scandinavian-inspired modern office design with clean lines, warm wood tones, and an emphasis on natural light.',
    ],
    ['privateoffice10000.pt', 'a high resolution photo of a modern minimalist office, desk and chair, personal office'],
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
    const resizedIMG = await fetch(`/api/images/resize?imageUrl=${imageUrl}&width=${width}&height=${height}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/*',
      },
    });

    const resizedMask = await fetch(`/api/images/resize?imageUrl=${mask}&width=${width}&height=${height}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/*',
      },
    });
    
    // Get binary data and content type
    const resizedIMGBuffer = await resizedIMG.arrayBuffer();
    const resizedIMGContentType = resizedIMG.headers.get('Content-Type');
    const resizedMaskBuffer = await resizedMask.arrayBuffer();
    const resizedMaskContentType = resizedMask.headers.get('Content-Type');

    // Append data to inference request
    const formData = new FormData();
    formData.append('init_image', new Blob([resizedIMGBuffer], { type: resizedIMGContentType! }));
    formData.append('mask_image', new Blob([resizedMaskBuffer], { type: resizedMaskContentType! }));
    formData.append('mask_source', 'MASK_IMAGE_WHITE');
    formData.append('text_prompts[0][text]', 'A photo of a modern bedroom, natural light');

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
        prev.map((render: string) =>
          render === 'load' ? imageSrc : render
        )
      );

    setFetching(false);
  }

  const inpainting = async (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
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

    // Save the images in RDS
    saveURLsInRDS(imageURLS);
  };

  const saveURLsInRDS = async (urls: string[]) => {
    const userId = localStorage.getItem('userId');
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
      console.log('Successfully saved images in RDS');
    } else {
      console.log('Failed to save images in RDS');
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

    // Save the image in RDS
    saveURLsInRDS([prediction.output]);
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
    const userId = localStorage.getItem('userId');

    // Generates a presigned POST
    const res = await fetch(
      `/api/images/upload?file=${filename}&fileType=${fileType}&userId=${userId}`
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
      return url + userId + '/' + filename;
    }
    return '';
  };

  const setOriginalImage = (img: string | undefined) => {
    setImage(img);
  };

  const changeMode = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => {
    if (value !== null) {
      setMode(value);
    }
  };

  return (
    <div className={styles.staging} id="tool">
      <SideNav handleLogout={handleLogout} />
      <StagingDisplay
        sketchRef={sketchRef}
        fetching={fetching}
        renders={renders}
        prediction={prediction}
        originalImage={originalImage}
        mode={mode}
        setImage={setOriginalImage}
        upscale={(imgURL: string) => upscale(imgURL)}
        changeMode={changeMode}
        inpainting={inpainting}
        dream={dream}
      />
    </div>
  );
}
