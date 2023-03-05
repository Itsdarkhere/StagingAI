/* eslint-disable @next/next/no-img-element */
import React, { createRef, RefObject, useEffect, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import styles from "../styles/StagingDisplay.module.css"
import PaintCursor from './PaintCursor'
import lottie from 'lottie-web';
import PAINT from '../public/paint1.json';
import MaskControl from './MaskControl';

export default function Sketch({originalImage, sketchRef}: {originalImage: string, sketchRef: RefObject<any>;}) {
  // State
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const [showBrushCursor, setShowBrushCursor] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [imgLoaded, setLoaded] = useState(false);
  // Refs
  let animationContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    setShowInstructions(true);
    setLoaded(false);
  }, [originalImage]);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // animationData: // local json file,
      animationData: PAINT,
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, [animationContainer]);
  
  const clearCanvas = () => {
    if (sketchRef.current !== null) {
      sketchRef.current.clearCanvas();
    }
  };

  const undoCanvas = () => {
    if (sketchRef.current !== null) {
      sketchRef.current.undo();
    }
  };

  const canvasStyles = {
    border: 'none',
    borderRadius: '0.25rem',
    opacity: 0.8,
  };

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(parseInt(event.target.value));
  };

  const onMouseEnter = () => {
    setShowInstructions(false);
    setShowBrushCursor(true);
  };
  return (
    <div className={`${styles.box}`}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <img
              src={originalImage}
              onLoad={() => setLoaded(true)}
              alt="original"
              className={`${styles.img} ${imgLoaded && styles.loaded}`}
            />
            {showBrushCursor && <PaintCursor size={strokeWidth} />}
            <div
              className={styles.sketchBox}
              onMouseEnter={() => onMouseEnter()}
              onMouseLeave={() => setShowBrushCursor(false)}
            >
              <ReactSketchCanvas
                ref={sketchRef}
                canvasColor="transparent"
                withViewBox={true}
                style={canvasStyles}
                strokeWidth={strokeWidth}
                exportWithBackgroundImage={true}
                strokeColor="white"
              />
              {showInstructions && imgLoaded && (
                <div
                  className={`${styles.instructionContainer} ${
                    imgLoaded && styles.loaded
                  }`}
                >
                  <div
                    ref={animationContainer}
                    className={styles.paintAnimation}
                  ></div>
                  <div className={styles.instructions}>
                    <p className={styles.mainI}>
                      Draw on the parts of the image you want to modify.
                    </p>
                    <p className={styles.secondaryI}>
                      To avoid modifications of objects when drawing on them,
                      you can leave a visible part of the object untouched.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {imgLoaded && (
            <MaskControl
              undo={undoCanvas}
              sliderChange={sliderChange}
              clear={clearCanvas}
              strokeWidth={strokeWidth}
            />
          )}
        </div>
  )
}
