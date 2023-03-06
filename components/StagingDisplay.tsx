/* eslint-disable @next/next/no-img-element */
'use client';
import React, { RefObject, useState } from 'react';
import styles from '../styles/StagingDisplay.module.css';
import NewRender from './NewRender';
import Modal from 'react-modal';
import Sketch from './Sketch';
import EmptyDisplay from './EmptyDisplay';

export default function StagingDisplay({
  sketchRef,
  fetching,
  renders,
  prediction,
  originalImage,
  mode,
  upscale,
  setImage,
}: {
  sketchRef: RefObject<any>;
  fetching: boolean;
  renders: string[];
  prediction: any;
  originalImage: string | undefined;
  mode: boolean;
  upscale: (imgURL: string) => void;
  setImage: (image: string | undefined) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIMG, setModalIMG] = useState<string>('');

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (imgURL: string) => {
    setModalIMG(imgURL);
    setModalOpen(true);
  };

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
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  };

  return (
    <div className={styles.stagingDisplay}>
      {/* <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <img
          src={modalIMG}
          alt="render"
          className={`${styles.modalImage}`}
        />
      </Modal> */}
      {(!originalImage || mode) && renders.length === 0 && <EmptyDisplay />}
      {!mode && originalImage && (
        <Sketch originalImage={originalImage} sketchRef={sketchRef} />
      )}
      <div className={styles.maskBox}>
        {renders.map((img, i) => {
          return (
            <NewRender
              fetching={fetching}
              prediction={prediction}
              setImage={setImage}
              key={i}
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
