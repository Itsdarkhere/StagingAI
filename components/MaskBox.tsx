/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import styles from "../styles/MaskBox.module.css";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import MaskControl from './MaskControl';

export default function MaskBox({originalImage, img64}: {originalImage: string | undefined, img64: string | null}) {
  const sketchRef = useRef<any>(null);

  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const canvasStyles = {
    border: 'none',
    borderRadius: '0.25rem',
    opacity: 0.8,
  };

  const clearCanvas = () => {
    if (sketchRef.current !== null) {
        sketchRef.current.clearCanvas();
    }
  }

  const undoCanvas = () => {
    if (sketchRef.current !== null) {
        sketchRef.current.undo();
    }
  }

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(parseInt(event.target.value));
  }

  return (
    <div className={styles.maskBox}>
        <div className={`${styles.box} ${styles.left}`}>
            <img src={originalImage} alt="original" className={styles.img} style={{maxWidth: '100%', width: '100%', height: 'auto'}} />
            <div className={styles.sketchBox}>
                <ReactSketchCanvas
                ref={sketchRef}
                canvasColor='transparent'
                // onChange={() => logPath()}
                withViewBox={true}
                style={canvasStyles}
                strokeWidth={strokeWidth}
                strokeColor="red"
                />
                <MaskControl undo={undoCanvas} sliderChange={sliderChange} clear={clearCanvas} strokeWidth={strokeWidth} />
            </div>
        </div>
        <div className={`${styles.box} ${styles.right}`}>
            {img64 && <Image fill style={{objectFit: 'cover'}} src={'data:image/jpeg;base64,' + img64} alt="result" />}
        </div>
    </div>
  )
}
