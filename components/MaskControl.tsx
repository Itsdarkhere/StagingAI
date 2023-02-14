import React from 'react'
import styles from "../styles/MaskControl.module.css"
import BACK2 from "../public/back2.svg"
import DELETE from "../public/delete.svg"
import Image from 'next/image'

export default function MaskControl() {
  return (
    <div className={styles.maskControl}>
        <div className={styles.controlTop}>
            <label className={styles.controlLabel}>Mask Controls</label>
            <button className={styles.controlClose}>X</button>
        </div>
        <div className={styles.controlBottom}>
            {/* onChange={sliderChange} */}
            <input min={1} max={100} id="copies" name="copies" type="range" required className={styles.controlSlider} />
            <input className={styles.controlValue} type={'text'} placeholder={'0'} />
            <button className={styles.controlB}>
                <Image width={20} height={20} src={BACK2} alt="back" />
            </button>
            <button className={styles.controlR}>
                <Image width={20} height={20} src={DELETE} alt="back" />
            </button>
        </div>
    </div>
  )
}
