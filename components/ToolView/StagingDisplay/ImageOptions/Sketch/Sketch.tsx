/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import React, { RefObject, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import MaskControl from './MaskControl';
import PaintCursor from './PaintCursor';
import styles from '../../../../../styles/ToolView/StagingDisplay/StagingDisplay.module.css';
import Instructions from './Instructions';

export default function Sketch({
  originalImage,
  setImage,
  sketchRef,
  mode,
}: {
  originalImage: string;
  setImage: (image: string | undefined) => void;
  sketchRef: RefObject<any>;
  mode: string;
}) {
  // State
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const [showBrushCursor, setShowBrushCursor] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [imgLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setShowInstructions(true);
    sketchRef.current?.clearCanvas();
    setImageLoading(true);
  }, [originalImage]);

  const onImageLoad = () => {
    setImageLoading(false);
  };

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

  const sliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === 'number') {
      // Center and show the paint cursor
      if (!showBrushCursor) {
        console.log("LOG");
        setShowBrushCursor(true);
        centerPaintCursor();
      }
      setStrokeWidth(value);
    }
  };

  const onMouseEnter = () => {
    setShowInstructions(false);
    setShowBrushCursor(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    setPosition({ x: offsetX, y: offsetY });
  };

  const centerPaintCursor = () => {
    const element = document.getElementById('sketchbox');
    if (element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }

  const onSliderChangeCommitted = () => {
    setShowBrushCursor(false);
  }

  return (
    <div className={`${styles.box}`}>
      <div className={styles.loadable}>
        <motion.img
          initial={{ height: '10rem', opacity: 0 }}
          animate={{
            height: imgLoading ? '10rem' : 'auto',
            opacity: imgLoading ? 0 : 1,
          }}
          className={`${styles.img}`}
          transition={{
            opacity: { delay: 0.5, duration: 0.4 },
            height: { delay: 0, duration: 0.4 },
          }}
          onLoad={onImageLoad}
          width="auto"
          src={originalImage}
        />
        {mode === 'inpainting' && (
          <div
            className={styles.sketchBox}
            id="sketchbox"
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => setShowBrushCursor(false)}
            onMouseMove={handleMouseMove}
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
            {showBrushCursor && mode === 'inpainting' && (
              <PaintCursor size={strokeWidth} position={position} />
            )}
            <AnimatePresence
              initial={false}
              mode="wait"
              onExitComplete={() => null}
            >
              {showInstructions && !imgLoading && <Instructions />}
            </AnimatePresence>
          </div>
        )}
      </div>
      {!imgLoading && mode === 'inpainting' && (
        <MaskControl
          undo={undoCanvas}
          sliderChange={sliderChange}
          onSliderChangeCommitted={onSliderChangeCommitted}
          clear={clearCanvas}
          strokeWidth={strokeWidth}
        />
      )}
    </div>
  );
}
