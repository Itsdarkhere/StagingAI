/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import styles from "../styles/MaskBox.module.css";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import MaskControl from './MaskControl';
import NewRender from './NewRender';

export default function MaskBox({originalImage, img64, rendering}: {originalImage: string | undefined, img64: string | null, rendering: boolean}) {
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
        {originalImage &&<div className={`${styles.box} ${styles.left}`}>
            <img src={originalImage} alt="original" className={styles.img} style={{width: 'auto', maxWidth: '100%', height: '100%', maxHeight: '520px'}} />
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
        </div>}
        <div className={`${styles.box} ${styles.right}`}>
            <NewRender image={img64} rendering={rendering} /> 
        </div>
    </div>
  )
}
