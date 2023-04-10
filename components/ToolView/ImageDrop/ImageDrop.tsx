import FormDropZone from '@/components/FormDropZone';
import styles from '../../../styles/ToolView/ImageDrop/ImageDrop.module.css';
import React, { useState } from 'react';

export default function ImageDrop({
  originalImage,
  setImage,
}: {
  originalImage: string | undefined;
  setImage: (image: string | undefined) => void;
}) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Remove image from state
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(undefined);
  };

  // triggers when file is dropped
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Upload image to S3
      await uploadPhoto(file);
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

  // handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    setUploadingPhoto(true);
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
    setUploadingPhoto(false);
  };

  return (
    <>
      <div className={styles.container} onDragEnter={handleDrag}>
        <FormDropZone
          uploadingPhoto={uploadingPhoto}
          image={originalImage}
          removeImage={removeImage}
          handleChange={handleChange}
          dragActive={dragActive}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
    </>
  );
}
