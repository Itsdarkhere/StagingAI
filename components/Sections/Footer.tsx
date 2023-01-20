import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Footer.module.css';
import LOGO from '../../public/logo.png';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <Image
          style={{ borderRadius: 4 }}
          height={200}
          width={200}
          src={LOGO}
          alt="logo"
        />
        <div className={styles.right}>
          <div className={styles.col}>
            <h6 className={styles.heading}>Terms and Conditions</h6>
            <Link className={styles.link} href={'/create'}>
              Terms
            </Link>
            <Link className={styles.link} href={'/create'}>
              Privacy Policy
            </Link>
            <Link className={styles.link} href={'/create'}>
              Disclaimer
            </Link>
            <Link className={styles.link} href={'/create'}>
              Refund Policy
            </Link>
            <Link className={styles.link} href={'/create'}>
              Cookie Policy
            </Link>
          </div>
          <div className={styles.col}>
            <h6 className={styles.heading}>Quick links</h6>
            <Link className={styles.link} href={'/create'}>
              Home
            </Link>
            <Link className={styles.link} href={'/create'}>
              Login
            </Link>
            <Link className={styles.link} href={'/create'}>
              Try it out
            </Link>
          </div>
        </div>
      </div>
      <p className={styles.p}>© 2023 BotInterior</p>
    </div>
  );
}
