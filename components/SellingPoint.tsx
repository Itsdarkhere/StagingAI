import React from 'react';
import SUCCESS from '../public/success.svg';
import Image from 'next/image';
import styles from '../styles/SellingPoint.module.css';

export default function SellingPoint({spt, sp}: {spt: string; sp: string}) {
  return (
    <div className={styles.sellingPoint}>
      <div className={styles.left}>
        <Image height={25} width={25} src={SUCCESS} alt="checkmark" />
        <p className={styles.pOne}>{spt}</p>
      </div>
      <p className={styles.pTwo}>{sp}</p>
    </div>
  );
}
