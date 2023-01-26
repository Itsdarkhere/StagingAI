import React from 'react'
import styles from "../styles/RenderBox.module.css";

export default function RenderBox({copies}: {copies: number}) {
  return (
    <div className={styles.renderbox}>
        {[...Array(copies)].map((_, i) => (
            <div key={i} className={`${styles.stagingBox} ${styles.shimmer}`}></div>
        ))}
    </div>
  )
}
