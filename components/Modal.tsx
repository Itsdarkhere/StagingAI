/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import styles from '../styles/Modal.module.css';

const transitions = {
    hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
      exit: {
        opacity: 0,
        scale: 0,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      },
};

export default function Modal({
  handleClose,
  img,
}: {
  handleClose: () => void;
  img: string;
}) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={transitions}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={img} alt="render" className={`${styles.modalImage}`} />
      </motion.div>
    </Backdrop>
  );
}
