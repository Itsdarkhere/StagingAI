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
  const [tooltipClass, setTooltipClass] = React.useState<string>('');
  const showInferenceStatus = () => {
    switch (prediction?.status) {
      case 'starting':
        return (
          <div className={styles.predictionStatus}>
            Starting... This might take a few minutes.
          </div>
        );
      case 'processing':
        return (
          <div className={styles.predictionStatus}>
            Processing... <ProcessingCount />
          </div>
        );
      case 'succeeded':
      case 'failed':
      default:
        return;
    }
  };

  useEffect(() => {
    setTooltipClass(generateRandomString(7));
  }, []);

  function generateRandomString(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  return (
    <div className={styles.render}>
      {image == 'load' && (
        <div className={styles.renderingIndicator}>
          {showInferenceStatus()}
          <Spinner wh={40} white={false} />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
      )}
      {image !== 'load' && (
        <div className={styles.imageOptions}>
          <Tooltip title="Download image">
            <Button
              variant='contained'
              color='primary'
              className={`${styles.optionButton}`}
            >
              <Image src={DOWNLOAD} alt="plus" height={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Use as base image">
            <Button
              variant='contained'
              color='primary'
              className={`${styles.optionButton}`}
              onClick={() => setImage(image)}
            >
              <Image src={EDIT} alt="plus" height={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Make this image larger">
            <Button
              variant='contained'
              color='primary'
              className={`${styles.optionButton}`}
              onClick={upscale}
              disabled={fetching}
            >
              <Image src={UPSCALE} alt="plus" height={20} />
            </Button>
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
