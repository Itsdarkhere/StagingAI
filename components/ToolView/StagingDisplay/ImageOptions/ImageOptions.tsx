import Sketch from '@/components/ToolView/StagingDisplay/ImageOptions/Sketch/Sketch';
import { RefObject, useState } from 'react';
import styles from '../../../../styles/ToolView/StagingDisplay/ImageOptions/ImageOptions.module.css';
import Options from './Options/Options';
import Image from 'next/image';
import TRASH from '../../../../public/trash.svg';
import REPLACE from '../../../../public/replace.svg';

export default function ImageOptions({
  clickMode,
  mode,
  originalImage,
  sketchRef,
  fetching,
  inpainting,
  controlnet,
  setImage,
}: {
  clickMode: (mode: boolean) => void;
  mode: boolean;
  originalImage: string | undefined;
  sketchRef: RefObject<any>;
  fetching: boolean;
  inpainting: (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
    concept: string;
    copies: number;
  }) => void;
  controlnet: (reqData: {
    room: string;
    style: string;
    image: string;
    copies: number;
  }) => void;
  setImage: (image: string | undefined) => void;
}) {
  const [copies, setCopies] = useState(1);

  const sliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopies(parseInt(e.target.value));
  };

  const validateForm1 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    const target = event.target as typeof event.target & {
      room: { value: string };
      style: { value: string };
    };

    const data = {
      room: target.room.value,
      style: target.style.value,
      image: originalImage!,
      copies: copies,
    };
    controlnet(data);
  };

  const validateForm2 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    let target;

    let data = {
      room: '',
      style: 'Fill with something',
      image: originalImage!,
      mask: '',
      concept: '',
      copies: copies,
    };

    target = event.target as typeof event.target & {
      what_to_add: { value: string };
    };
    data.room = target.what_to_add.value;

    inpainting(data);
  };

  const validateBasedOnMode = (event: React.SyntheticEvent) => {
    if (mode) {
      validateForm1(event);
    } else {
      validateForm2(event);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]!;
    // Upload image to S3
    await uploadPhoto(file);
    e.target.value = '';
  };

  const uploadPhoto = async (file: File) => {
    // setUploadingPhoto(true);
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
      setImage(url + filename);
    }
    // setUploadingPhoto(false);
  };

  return (
    <form className={styles.container} onSubmit={(e) => validateBasedOnMode(e)}>
      <div className={styles.sketchcontainer}>
        <div>
          <input type="file"
        accept="image/*" onChange={handleChange} id="fileInput" className={styles.input} />
          <label htmlFor="fileInput" className={styles.label}>
            Change Image
          </label>
        </div>
        {originalImage && (
          <Sketch
            originalImage={originalImage}
            sketchRef={sketchRef}
            mode={mode}
          />
        )}
      </div>
      <Options
        fetching={fetching}
        clickMode={clickMode}
        mode={mode}
        copies={copies}
        sliderChange={sliderChange}
      />
    </form>
  );
}
