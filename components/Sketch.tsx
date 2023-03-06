/* eslint-disable @next/next/no-img-element */
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styles from '../styles/StagingDisplay.module.css';
import PaintCursor from './PaintCursor';
import lottie from 'lottie-web';
import PAINT from '../public/paint1.json';
import MaskControl from './MaskControl';
import { AnimatePresence, motion } from 'framer-motion';

export default function Sketch({
  originalImage,
  sketchRef,
}: {
  originalImage: string;
  sketchRef: RefObject<any>;
}) {
  // State
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const [showBrushCursor, setShowBrushCursor] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [imgLoading, setImageLoading] = useState(true);
  const [shimmering, setShimmering] = useState(true);
  // Refs
  let animationContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    setShowInstructions(true);
    sketchRef.current.clearCanvas();
    setImageLoading(true);
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

  const onImageLoad = () => {
    setImageLoading(false);
    // Remove timeout on return
    setTimeout(() => setShimmering(false), 600);
  }

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
        className={`${shimmering && styles.shimmer} ${styles.loadable}`}
      >
        <motion.img initial={{height: '10rem', opacity: 0}}
        animate={{
          height: imgLoading ? '10rem' : 'auto',
          opacity: imgLoading ? 0 : 1
        }}
        className={`${styles.img}`}
        transition={{
          opacity: { delay: 0.5, duration: 0.4 },
          height: { delay: 0, duration: 0.4 }
        }}
        onLoad={onImageLoad}
        width='auto'
        src={originalImage}/>
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
          <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {showInstructions && !imgLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { delay: 0.5, duration: 0.4 }
              }}
              className={`${styles.instructionContainer}`}
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
                  To avoid modifications of objects when drawing on them, you
                  can leave a visible part of the object untouched.
                </p>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div> 
      {!imgLoading && (
        <MaskControl
          undo={undoCanvas}
          sliderChange={sliderChange}
          clear={clearCanvas}
          strokeWidth={strokeWidth}
        />
      )}
    </div>
  );
}
