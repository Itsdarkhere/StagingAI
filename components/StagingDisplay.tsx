/* eslint-disable @next/next/no-img-element */
'use client'
import React, { RefObject, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styles from '../styles/StagingDisplay.module.css';
import MaskControl from './MaskControl';
import NewRender from './NewRender';
import Modal from "react-modal";
import LoadingRender from './LoadingRender';
import PaintCursor from './PaintCursor';

export default function StagingDisplay({
  sketchRef,
  renders,
  originalImage,
  rendering,
  mode,
  upscale,
}: {
  sketchRef: RefObject<any>;
  renders: string[];
  originalImage: string | undefined;
  rendering: boolean;
  mode: boolean;
  upscale: (imgURL: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const [modalIMG, setModalIMG] = useState<string>('');
  const canvasStyles = {
    border: 'none',
    borderRadius: '0.25rem',
    opacity: 0.8,
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

  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(parseInt(event.target.value));
  };

  const getSketchBox = () => {
    if (originalImage) {
      return (
        <div className={`${styles.box} ${styles.left}`}>
          <div style={{ position: 'relative', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
            <img
              src={originalImage}
              alt="original"
              className={styles.img}
            />
            <PaintCursor size={strokeWidth} />
            <div className={styles.sketchBox}>
              <ReactSketchCanvas
                ref={sketchRef}
                canvasColor="transparent"
                withViewBox={true}
                style={canvasStyles}
                strokeWidth={strokeWidth}
                exportWithBackgroundImage={true}
                strokeColor="white"
              />
            </div>
          </div>
          <MaskControl
            undo={undoCanvas}
            sliderChange={sliderChange}
            clear={clearCanvas}
            strokeWidth={strokeWidth}
          />
        </div>
      );
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = (imgURL: string) => {
    setModalIMG(imgURL);
    setModalOpen(true);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
      border: 'none',
      padding: 0,
    },
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    }
  };

  return (
    <div className={styles.stagingDisplay}>
      <Modal 
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}>
          <img
          src={modalIMG}
          alt="render"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        />
      </Modal>
      <div className={styles.maskBox}>
        {!mode && getSketchBox()}
          {rendering && <LoadingRender />}
          {renders.map((img, i) => {
            return (
              <NewRender
                key={img}
                image={img}
                upscale={() => upscale(img)}
                openModal={(imgURL: string) => openModal(imgURL)}
              />
            );
          })}
      </div>
    </div>
  );
}
