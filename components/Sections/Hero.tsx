'use client'
import React, { createRef, useEffect } from 'react';
import styles from '../../styles/Hero.module.css';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import lottie from 'lottie-web';
import LOTTIE from "../../public/lottie.json";

export default function Hero() {
    let animationContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // animationData: // local json file,
      animationData: LOTTIE,
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, [animationContainer]);
  
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heading}>
          Virtual Staging in
          <span className={styles.span}> Seconds</span>
        </h1>
        <p className={styles.p}>
          Stable Diffusion is a latent text-to-image diffusion model capable of
          generating photo-realistic images given any text input, cultivates
          autonomous freedom to produce incredible imagery, empowers billions of
          people to create stunning art within seconds.
        </p>
        <div className={styles.buttonbox}>
          <SecondaryButton text="Try For Free" margin={true} />
          <PrimaryButton text="Log in" />
        </div>
        <div className="animation-container" ref={animationContainer} />
      </div>
    </div>
  );
}
