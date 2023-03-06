import React, { useState, useEffect } from 'react';
import styles from '../../styles/PaintCursor.module.css';

export default function PaintCursor({ size }: { size: number }) {
  const [position, setPosition] = useState({ x: -40, y: -40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.offsetX, y: e.offsetY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div
      style={{
        top: position.y + 'px',
        left: position.x + 'px',
        width: size,
        height: size,
      }}
      className={styles.cursorCircle}
    ></div>
  );
}
