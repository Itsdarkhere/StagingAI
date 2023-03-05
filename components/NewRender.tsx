/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/NewRender.module.css';
import DOWNLOAD from "../public/download.svg";
import UPSCALE from "../public/upscale.svg";
import Image from 'next/image';
import Spinner from './Spinner';
import ProcessingCount from './ProcessingCount';

export default function NewRender({
  image,
  upscale,
  prediction,
  openModal
}: {
  image: string;
  upscale: () => void;
  prediction: any;
  openModal: (imgURL: string) => void;
}) {
  const showInferenceStatus = () => {
    switch (prediction?.status) {
      case 'starting':
        return <div className={styles.preditionStatus}>Starting... This might take a few minutes.</div>
      case 'processing':
        return <div className={styles.preditionStatus}>Processing... <ProcessingCount /></div>
      case 'succeeded':
        return <div className={styles.preditionStatus}>Success!</div>
      case 'failed':
      default:
        return;
    }
  }
  return (
    <div className={styles.render}>
      { image == 'load' && 
      <div className={styles.renderingIndicator}>
        {showInferenceStatus()}
        <Spinner wh={40} white={true} />
        <h4 className={styles.renderingHeading}>Rendering...</h4>
      </div>
      }
      <div className={styles.imageOptions}>
        <button className={`${styles.optionButton}`}>
          <Image
            src={DOWNLOAD}
            alt="plus"
            height={20}
            style={{ marginRight: 5 }}
          />
          Download
        </button>
        <button className={`${styles.optionButton}`}  onClick={upscale}>
          <Image
            src={UPSCALE}
            alt="plus"
            height={20}
            style={{ marginRight: 5 }}
          />
          Upscale
        </button>
      </div>
      {image !== 'load' && <img
        onClick={() => openModal(image)}
        src={image}
        alt="render"
        style={{
          width: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '100%',
          maxHeight: '520px',
          borderRadius: '4px',
        }}
      />
      }
    </div>
  );
}
