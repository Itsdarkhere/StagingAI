/* eslint-disable @next/next/no-img-element */
import React, { RefObject, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styles from '../styles/StagingDisplay.module.css';
import MaskControl from './MaskControl';
import NewRender from './NewRender';

export default function StagingDisplay({sketchRef, img64, originalImage, rendering, action}: 
  {sketchRef: RefObject<any>, img64: string | null, originalImage: string | undefined, rendering: boolean, action: string}) {
  
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

    const renderBasedOnAction = () => {
      switch(action) {
        case 'replace':
        case 'remove':
        case 'add':
          return getSketchBox();
        default:
          return;  
      }
    }

    const getSketchBox = () => {
      if (originalImage) {
        return (
          <div className={`${styles.box} ${styles.left}`}>
            <div style={{margin: 'auto', maxHeight: 520, position: 'relative'}}>
              <img src={originalImage} alt="original" className={styles.img} style={{width: 'auto', maxWidth: '100%', height: '100%', maxHeight: '520px'}} />
              <div className={styles.sketchBox}>
                  <ReactSketchCanvas
                  ref={sketchRef}
                  canvasColor='transparent'
                  withViewBox={true}
                  style={canvasStyles}
                  strokeWidth={strokeWidth}
                  strokeColor="red"
                  />
              </div>
            </div>
            <MaskControl undo={undoCanvas} sliderChange={sliderChange} clear={clearCanvas} strokeWidth={strokeWidth} />
        </div>
        )
      }
    }
  
  return (
    <div className={styles.stagingDisplay}>
      <div className={styles.maskBox}>
        {renderBasedOnAction()}
        <NewRender image={img64} rendering={rendering} />
    </div>
    </div>
  );
}
