/* eslint-disable @next/next/no-img-element */
'use client';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import styles from '../styles/StagingDisplay.module.css';
import NewRender from './NewRender';
import Modal from 'react-modal';
import Sketch from './Sketch';
import lottie from 'lottie-web';
import LOTTIE from '../public/lottie2.json';

export default function StagingDisplay({
  sketchRef,
  renders,
  prediction,
  originalImage,
  mode,
  upscale,
}: {
  sketchRef: RefObject<any>;
  renders: string[];
  prediction: any;
  originalImage: string | undefined;
  mode: boolean;
  upscale: (imgURL: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIMG, setModalIMG] = useState<string>('');
  const [showLottie, setShowLottie] = useState<boolean>(false);
  let animationContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LOTTIE,
    });

    const lottieShow = () => {
      setShowLottie(true);
    };

    anim.addEventListener('DOMLoaded', lottieShow);

    return () => {
      anim.destroy();
    };
  }, [animationContainer]);

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
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
  };

  return (
    <div className={styles.stagingDisplay}>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
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
      {(!originalImage || mode) && renders.length === 0 && (
        <div className={styles.displayAnimation}>
          <div ref={animationContainer}></div>
          <div
            className={`${styles.pitch} ${showLottie && styles.pitchVisible}`}
          >
            Experience the power of AI-generated virtual staging images, and
            save up to 95% compared to traditional virtual staging agencies who
            bill up to $60 per image and may take up to 3 days to complete the
            work. With our AI technology, you&apos;ll receive high-quality virtual
            staging images in seconds at a fraction of the cost. Don&apos;t wait -
            start saving time and money today!
          </div>
        </div>
      )}
      {!mode && originalImage && (
        <Sketch originalImage={originalImage} sketchRef={sketchRef} />
      )}
      <div className={styles.maskBox}>
        {renders.map((img, i) => {
          return (
            <NewRender
              prediction={prediction}
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
