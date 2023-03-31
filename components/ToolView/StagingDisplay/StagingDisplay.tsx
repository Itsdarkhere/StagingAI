/* eslint-disable @next/next/no-img-element */
'use client';
import { AnimatePresence } from 'framer-motion';
import { RefObject, useState } from 'react';
import styles from '../../../styles/StagingDisplay.module.css';
import Modal from '../../Modal';
import NewRender from '../../NewRender';
import ImageOptions from './ImageOptions/ImageOptions';

export default function StagingDisplay({
  sketchRef,
  fetching,
  renders,
  prediction,
  originalImage,
  mode,
  upscale,
  setImage,
  clickMode,
}: {
  sketchRef: RefObject<any>;
  fetching: boolean;
  renders: string[];
  prediction: any;
  originalImage: string | undefined;
  mode: boolean;
  upscale: (imgURL: string) => void;
  setImage: (image: string | undefined) => void;
  clickMode: (mode: boolean) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIMG, setModalIMG] = useState<string>('');

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (imgURL: string) => {
    console.log('MODAL OPENED');
    setModalIMG(imgURL);
    setModalOpen(true);
  };

  return (
    <div className={styles.stagingDisplay}>
      {/* Image popup */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal handleClose={closeModal} img={modalIMG} />}
      </AnimatePresence>
      {/* Image and options */}
      <ImageOptions
        clickMode={clickMode}
        mode={mode}
        originalImage={originalImage}
        sketchRef={sketchRef}
        fetching={fetching}
      />
      {/* Resulting Images */}
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
