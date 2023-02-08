import Image from 'next/image';
import React from 'react'
import styles from "../styles/RenderBox.module.css";

export default function RenderBox({img64}: {img64: string | null}) {
  return (
    <div className={styles.renderbox}>
        <div className={`${styles.stagingBox} ${!img64 && styles.shimmer}`}>
          {img64 && <Image alt="render" fill src={'data:image/jpeg;base64,' + img64} />}
        </div>
    </div>
  )
}
