'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/How.module.css';
import Image from 'next/image';
import ILLU1 from '../../public/illu1.png';

export default function How() {
  const [refOne, oneInView] = useInView({
    triggerOnce: false,
    rootMargin: '-50% 0% -5% 0%',
  });

  const [refTwo, twoInView] = useInView({
    triggerOnce: false,
    rootMargin: '-30% 0% -50% 0%',
  });

  const [refThree, threeInView] = useInView({
    triggerOnce: false,
    rootMargin: '-5% 0% -70% 0%',
  });

  return (
    <div className={styles.how}>
      <div className={styles.howInner}>
        <div className={styles.imgBox}>
          <Image
            style={{ objectFit: 'cover' }}
            fill
            src={ILLU1}
            alt="illustration"
          />
        </div>
        <div className={styles.right}>
          <h2 className={styles.heading}>How It Works</h2>
          <div
            ref={refOne}
            className={`${styles.step} ${oneInView && styles.selected}`}
          >
            <h5 className={styles.headingTwo}>1. Request Quote</h5>
            <p className={styles.p}>
              Request quotes from our 102.222 rated transport providers
            </p>
          </div>
          <div
            ref={refTwo}
            className={`${styles.step} ${twoInView && styles.selected}`}
          >
            <h5 className={styles.headingTwo}>2. Compare Price</h5>
            <p className={styles.p}>
              Request quotes from our 102.222 rated transport providers
            </p>
          </div>
          <div
            ref={refThree}
            className={`${styles.step} ${threeInView && styles.selected}`}
          >
            <h5 className={styles.headingTwo}>3. Choose Provider</h5>
            <p className={styles.p}>
              Request quotes from our 102.222 rated transport providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
