'use client'
import React from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
import SOFA from '../public/sofa.svg';
import { IconButton } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <Image src={SOFA} height={30} width={35} alt="logo" />
          <h2 className={styles.brandname}>RealTool</h2>
        </div>
        <div className={styles.headerRight}>
          <IconButton color="primary" aria-label="open navigation">
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
