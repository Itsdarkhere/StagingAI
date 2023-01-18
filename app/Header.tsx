import PrimaryButton from '@/components/PrimaryButton';
import React from 'react'
import styles from "../styles/Header.module.css";
import Image from 'next/image';
import SOFA from "../public/sofa.svg";
import SecondaryButton from '@/components/SecondaryButton';

export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
                <Image src={SOFA} height={30} width={35} alt="logo" />
                <h2 className={styles.brandname}>BotInterior</h2>
            </div>
            <div className={styles.headerRight}>
                <SecondaryButton text='Try For Free' margin={true} />
                <PrimaryButton text='Log In' />
            </div>
        </div>
    </div>
  )
}
