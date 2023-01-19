import React from 'react'
import styles from "../../styles/How.module.css";
import Image from 'next/image';
import WORK from "../../public/work.jpg";

export default function How() {
  return (
    <div className={styles.how}>
        <div className={styles.howInner}>
            <div className={styles.imgBox}>
                <Image style={{objectFit: 'cover'}} fill src={WORK} alt="illustration" />
            </div>
            <div className={styles.right}>
                <h2 className={styles.heading}>How It Works</h2>
                <div className={styles.step}>
                    <h5 className={styles.headingTwo}>1. Request Quote</h5>
                    <p className={styles.p}>Request quotes from our 102.222 rated transport providers</p>
                </div>
                <div className={`${styles.step} ${styles.selected}`}>
                    <h5 className={styles.headingTwo}>2. Compare Price</h5>
                    <p className={styles.p}>Request quotes from our 102.222 rated transport providers</p>
                </div>
                <div className={styles.step}>
                    <h5 className={styles.headingTwo}>3. Choose Provider</h5>
                    <p className={styles.p}>Request quotes from our 102.222 rated transport providers</p>
                </div>
            </div>
        </div>
    </div>
  )
}
