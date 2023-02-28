import React, { useState } from 'react'
import FormAdd from './FormAdd';
import FormRemove from './FormRemove';
import FormReplace from './FormReplace';
import Image from 'next/image';
import PLUS from '../public/plus.svg';
import TRASH from '../public/trash.svg';
import REPLACE from "../public/replace.svg";
import styles from "../styles/FormInpainting.module.css";

export default function FormInpainting({inpaintingMode, clickInpaintingMode}: {inpaintingMode: number, clickInpaintingMode: (mode: number) => void}) {
  const renderBasedOnMode = () => {
    switch (inpaintingMode) {
      case 0:
        return <FormAdd />
      case 1:
        return <FormRemove />
      case 2:
        return <FormReplace />
      default:
        return
    }
  }
  return (
    <div className={styles.formInpainting}>
        <div className={styles.ipButtonContainer}>
            <button type='button' className={`${styles.ipButton} ${inpaintingMode == 0 && styles.selected}`} onClick={() => clickInpaintingMode(0)}>
                <Image
                className={`${inpaintingMode == 0 && styles.brightImage}`}
                src={PLUS}
                alt="plus"
                style={{ marginBottom: 5 }}
                />
                Add
            </button>
            <button type='button' className={`${styles.ipButton} ${inpaintingMode == 1 && styles.selected}`} onClick={() => clickInpaintingMode(1)}>
                <Image
                className={`${inpaintingMode == 1 && styles.brightImage}`}
                src={TRASH}
                alt="plus"
                style={{ marginBottom: 5 }}
                />
                Remove
            </button>
            <button type='button' className={`${styles.ipButton} ${inpaintingMode == 2 && styles.selected}`} onClick={() => clickInpaintingMode(2)}>
                <Image
                className={`${inpaintingMode == 2 && styles.brightImage}`}
                src={REPLACE}
                height={15}
                alt="plus"
                style={{ marginBottom: 5 }}
                />
                Replace
          </button>
        </div>
        {renderBasedOnMode()}
    </div>
  )
}
