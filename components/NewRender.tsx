/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/NewRender.module.css';
import DOWNLOAD from '../public/download.svg';
import UPSCALE from '../public/upscale.svg';
import Image from 'next/image';
import Spinner from './Spinner';
import ProcessingCount from './ProcessingCount';
import { Tooltip } from 'react-tooltip';

export default function NewRender({
  image,
  upscale,
  prediction,
  openModal,
}: {
  image: string;
  upscale: () => void;
  prediction: any;
  openModal: (imgURL: string) => void;
}) {
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
  return (
    <div className={styles.render}>
      {image == 'load' && (
        <div className={styles.renderingIndicator}>
          {showInferenceStatus()}
          <Spinner wh={40} white={true} />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
      )}
      {image !== 'load' && (
        <div className={styles.imageOptions}>
          <Tooltip
            place="left"
            style={{ opacity: 1 }}
            variant="light"
            anchorSelect=".render-tooltip"
          />
          <button
            className={`${styles.optionButton} render-tooltip`}
            data-tooltip-content="Download image"
          >
            <Image src={DOWNLOAD} alt="plus" height={20} />
          </button>
          <button
            className={`${styles.optionButton} render-tooltip`}
            data-tooltip-content="Make this image larger"
            onClick={upscale}
          >
            <Image src={UPSCALE} alt="plus" height={20} />
          </button>
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
