import Image from 'next/image';
import React from 'react'
import styles from "../styles/MaskBox.module.css";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import MaskControl from './MaskControl';

export default function MaskBox({originalImage, img64}: {originalImage: string | undefined, img64: string | null}) {
  const canvasStyles = {
    border: 'none',
    borderRadius: '0.25rem',
    opacity: 0.8,
  };
  return (
    <div className={styles.maskBox}>
        <div className={`${styles.box} ${styles.left}`}>
            {originalImage && <img src={originalImage} alt="original" style={{maxWidth: '100%', height: 'auto'}} /> }
            <div className={styles.sketchBox}>
                <ReactSketchCanvas
                className={styles.sketchCanvas}
                style={canvasStyles}
                strokeWidth={50}
                strokeColor="red"
                />
                <MaskControl />
            </div>
        </div>
        <div className={`${styles.box} ${styles.right}`}>
            {img64 && <Image fill style={{objectFit: 'cover'}} src={'data:image/jpeg;base64,' + img64} alt="result" />}
        </div>
    </div>
  )
}
