import React, { useState, useEffect, useRef } from 'react'
import styles from "../styles/ProcessingCount.module.css";

export default function ProcessingCount() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [])

  const formattedTime = time.toFixed(2);

  return (
    <div className={styles.processingCount}>{formattedTime}s</div>
  )
}
