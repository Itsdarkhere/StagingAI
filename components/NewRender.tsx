/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ProgressBar } from 'react-loader-spinner';
import styles from '../styles/NewRender.module.css';

export default function NewRender({
  image,
  rendering,
}: {
  image: string | null;
  rendering: boolean;
}) {
  return (
    <div className={styles.render}>
      {image && !rendering && (
        <img
          src={image}
          alt="render"
          style={{
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
            maxHeight: '520px',
          }}
        />
      )}
      {rendering && (
        <div className={styles.renderingIndicator}>
          <ProgressBar
            height="40"
            width="60"
            ariaLabel="progress-bar-loading"
            wrapperClass="progress-bar-wrapper"
            borderColor="#616161"
            barColor="#616161"
          />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
      )}
    </div>
  );
}
