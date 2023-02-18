import Image from 'next/image';
import React from 'react'
import styles from "../styles/RenderBox.module.css";
import NewRender from './NewRender';

export default function RenderBox({img64, rendering}: {img64: string | null, rendering: boolean}) {
  return (
    <div className={styles.renderbox}>
        <div className={`${styles.stagingBox}`}>
          <NewRender image={img64} rendering={rendering} /> 
        </div>
    </div>
  )
}
