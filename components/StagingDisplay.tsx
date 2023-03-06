/* eslint-disable @next/next/no-img-element */
'use client';
import React, { RefObject, useState } from 'react';
import styles from '../styles/StagingDisplay.module.css';
import NewRender from './NewRender';
import { AnimatePresence } from 'framer-motion';
import Sketch from './Sketch';
import EmptyDisplay from './EmptyDisplay';
import Modal from './Modal';

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
    console.log("MODAL OPENED")
    setModalIMG(imgURL);
    setModalOpen(true);
  };

  return (
    <div className={styles.stagingDisplay}>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal handleClose={closeModal} img={modalIMG} />}
      </AnimatePresence>
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
