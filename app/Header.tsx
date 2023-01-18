import PrimaryButton from '@/components/PrimaryButton';
import React from 'react'
import styles from "../styles/Header.module.css";
import Image from 'next/image';
import LOGO from "../public/logo.svg";
import FURNITURE from "../public/furniture.svg";

export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
                <Image src={FURNITURE} height={35} width={35} alt="logo" />
                <h2 className={styles.brandname}>AIStaging</h2>
            </div>
            <div className={styles.headerRight}>
                <PrimaryButton text='Try For Free' />
                <PrimaryButton text='Log In' />
            </div>
        </div>
    </div>
  )
}
