import React, { useState, useEffect } from 'react'
import styles from "../styles/PaintCursor.module.css"

export default function PaintCursor({size}: {size: number}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
        document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [])
  return (
    <div 
        style={{
            top: position.y + 'px', 
            left: position.x + 'px', 
            width: size, height: size
        }} 
        className={styles.cursorCircle}>
    </div>
  )
}
