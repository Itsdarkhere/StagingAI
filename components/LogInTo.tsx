'use client';
import React from 'react';
import styles from '../styles/LogInTo.module.css';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogInTo() {
  const router = useRouter();

  const routeToLogin = () => {
    router.push('/login');
  };
  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <div className={styles.box}>
          <span className={styles.span}>Access denied</span>
          <h6 className={styles.heading}>You must login to access the app!</h6>
          <Button
            onClick={routeToLogin}
            variant="contained"
            component="label"
            style={{
              marginTop: 10,
              textTransform: 'none',
              position: 'relative',
              backgroundColor: 'rgb(99, 102, 241)',
              height: 40,
              paddingLeft: 25,
              paddingRight: 25,
            }}
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
}
