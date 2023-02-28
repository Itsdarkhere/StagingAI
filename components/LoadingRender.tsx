import React from 'react'
import styles from '../styles/NewRender.module.css';
import Spinner from './Spinner';

export default function LoadingRender() {
  return (
    <div className={styles.render}>
        <div className={styles.renderingIndicator}>
          <Spinner wh={40} white={true} />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
    </div>
  )
}
