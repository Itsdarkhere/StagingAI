/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/NewRender.module.css';
import Spinner from './Spinner';

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
          <Spinner wh={40} white={true} />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
      )}
    </div>
  );
}
