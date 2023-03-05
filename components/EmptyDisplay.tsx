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
        Experience the power of AI-generated virtual staging images, and save up
        to 95% compared to traditional virtual staging agencies who bill up to
        $60 per image and may take up to 3 days to complete the work. With our
        AI technology, you&apos;ll receive high-quality virtual staging images
        in seconds at a fraction of the cost. Don&apos;t wait - start saving
        time and money today!
      </div>
    </div>
  );
}
