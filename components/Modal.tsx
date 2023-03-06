/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import styles from '../styles/Modal.module.css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
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
        className=""
        variants={undefined}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={img} alt="render" className={`${styles.modalImage}`} />
      </motion.div>
    </Backdrop>
  );
}
