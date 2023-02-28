/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from '../styles/NewRender.module.css';
import buttonStyles from "../styles/SecondaryButton.module.css";
import Spinner from './Spinner';
import Modal from "react-modal";

export default function NewRender({
  image,
  rendering,
  upscale,
}: {
  image: string | null;
  rendering: boolean;
  upscale: () => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = () => {
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
    <div className={styles.render}>
      <Modal 
        isOpen={modalOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById('app')!}
        contentLabel="Example Modal"
        style={customStyles}>
          <img
          src={image!}
          alt="render"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        />
      </Modal>
      {image && !rendering && (
        <>
        <div className={styles.imageOptions}>
          <button className={`${styles.optionButton} ${buttonStyles.button}`} onClick={openModal}>Open modal</button>
          <button className={`${styles.optionButton} ${buttonStyles.button}`}  onClick={upscale}>Upscale</button>
        </div>
        <img
          src={image}
          alt="render"
          style={{
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
            maxHeight: '520px',
          }}
        />
        </>
      )}
      {rendering && (
        <div className={styles.renderingIndicator}>
          <Spinner wh={40} white={true} />
          <h4 className={styles.renderingHeading}>Rendering...</h4>
        </div>
      )}
    </div>
  );
}
