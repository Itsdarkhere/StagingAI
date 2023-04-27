import { motion } from 'framer-motion';
import lottie from 'lottie-web';
import { createRef, useEffect } from 'react';
import styles from '../../../../styles/ToolView/StagingDisplay/StagingDisplay.module.css';
import PAINT from '../../../../public/paint1.json';

export default function Instructions() {
  let animationContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // animationData: // local json file,
      animationData: PAINT,
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, [animationContainer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { delay: 0.5, duration: 0.4 },
      }}
      className={`${styles.instructionContainer}`}
    >
      <div ref={animationContainer} className={styles.paintAnimation}></div>
      <div className={styles.instructions}>
        <p className={styles.mainI}>
          Draw on the parts of the image you want to modify.
        </p>
        <p className={styles.secondaryI}>
          To avoid modifying floor material etc, leave a part of it unpainted.
        </p>
      </div>
    </motion.div>
  );
}
