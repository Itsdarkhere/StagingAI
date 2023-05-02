/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import styles from '../styles/NewRender.module.css';
import DOWNLOAD from '../public/download.svg';
import UPSCALE from '../public/upscale.svg';
import EDIT from '../public/edit.svg';
import Image from 'next/image';
import Spinner from './Spinner';
import ProcessingCount from './ProcessingCount';
import { Tooltip } from '@mui/material';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';

export default function NewRender({
  image,
  upscale,
  prediction,
  openModal,
  fetching,
  setImage,
}: {
  image: string;
  upscale: () => void;
  prediction: any;
  openModal: (imgURL: string) => void;
  fetching: boolean;
  setImage: (image: string | undefined) => void;
}) {
  const showInferenceStatus = () => {
    switch (prediction?.status) {
      case 'starting':
        return (
          <div className={styles.predictionStatus}>
            <Alert severity="info">
              Starting... This might take a few minutes
            </Alert>
          </div>
        );
      case 'processing':
        return (
          <div className={styles.predictionStatus}>
            <Alert severity="success">
              Processing... <ProcessingCount />
            </Alert>
          </div>
        );
      case 'succeeded':
      case 'failed':
      default:
        return;
    }
  };

  function generateRandomString(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const downloadImage = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL after download is complete
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 100);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  // If fileName is not provided, extract it from the imageUrl or generate one based on the current timestamp
  const getFileName = (url: string) => {
    const urlParts = url.split('/');
    const extractedName = urlParts[urlParts.length - 1];
    if (extractedName) return extractedName;
    return `image-${Date.now()}.jpg`;
  };

  return (
    <div className={styles.render}>
      {image == 'load' && (
        <div className={styles.renderingIndicator}>
          {showInferenceStatus()}
          <Spinner wh={40} white={false} />
          <h4 className={styles.renderingHeading}>Loading...</h4>
        </div>
      )}
      {image !== 'load' && (
        <div className={styles.imageOptions}>
          <Tooltip title="Download image">
            <Button
              variant="contained"
              color="warning"
              className={`${styles.optionButton}`}
              onClick={() => downloadImage(image, getFileName(image))}
            >
              <Image src={DOWNLOAD} alt="plus" height={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Use as base image">
            <Button
              variant="contained"
              color="warning"
              className={`${styles.optionButton}`}
              onClick={() => setImage(image)}
            >
              <Image src={EDIT} alt="plus" height={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Make this image larger">
            {/* Span for mui since the button get disabled */}
            <span>
              <Button
                variant="contained"
                color="warning"
                className={`${styles.optionButton}`}
                onClick={upscale}
                disabled={fetching}
              >
                <Image src={UPSCALE} alt="plus" height={20} />
              </Button>
            </span>
          </Tooltip>
        </div>
      )}
      {image !== 'load' && (
        <img
          onClick={() => openModal(image)}
          src={image}
          alt="render"
          className={styles.renderImage}
        />
      )}
    </div>
  );
}
