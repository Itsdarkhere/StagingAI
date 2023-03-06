import React, { createRef, useEffect, useRef, useState } from 'react';
import styles from '../styles/StagingDisplay.module.css';
import lottie from 'lottie-web';
import LOTTIE from '../public/lottie2.json';

export default function EmptyDisplay() {
  const [showLottie, setShowLottie] = useState<boolean>(false);
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LOTTIE,
    });

    const lottieShow = () => {
      setShowLottie(true);
    };

    anim.addEventListener('DOMLoaded', lottieShow);

    return () => {
      anim.destroy();
    };
  }, [animationContainer]);

  return (
    <div className={styles.displayAnimation}>
      <div ref={animationContainer}></div>
      <div className={`${styles.pitch} ${showLottie && styles.pitchVisible}`}>
        With our AI technology, you&apos;ll receive high-quality virtual staging
        images in seconds at a fraction of the cost of traditional virtual
        staging agencies who bill up to $60 per image and may take days to
        complete the work.
      </div>
    </div>
  );
}
