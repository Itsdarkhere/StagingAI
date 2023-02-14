import Image from 'next/image';
import React from 'react'
import styles from "../styles/MaskBox.module.css";

export default function MaskBox({originalImage, img64}: {originalImage: string | undefined, img64: string | null}) {
  return (
    <div className={styles.maskBox}>
        <div className={`${styles.box} ${styles.left}`}>
            {originalImage && <Image fill style={{objectFit: 'cover'}} src={originalImage} alt="original" />}
        </div>
        <div className={`${styles.box} ${styles.right}`}>
            {img64 && <Image fill style={{objectFit: 'cover'}} src={'data:image/jpeg;base64,' + img64} alt="result" />}
        </div>
    </div>
  )
}
