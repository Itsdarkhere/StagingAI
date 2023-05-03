'use client';
import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import { Alert, Button, Snackbar } from '@mui/material';
import { signIn } from 'next-auth/react';
import Spinner from '../Spinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      // Redirect to create, not actually since error redirect is awfull
      callbackUrl: '/create',
    }).then((res) => {
      if (res?.ok) {
        window.location.href = '/create';
      } else {
        setLoading(false);
        handleOpen();
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div className={styles.container}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          Incorrect login!
        </Alert>
      </Snackbar>
      <div className={styles.innercontainer}>
        <div className={styles.box}>
          <div className={styles.textbox}>
            <div className={styles.textboxinner}>
              <span className={styles.span}>Log in</span>
              <p className={styles.p}>
                Dont have an account?{' '}
                <Link className={styles.link} href="/signup">
                  Register
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              placeholder="Email Address"
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              style={{ marginTop: 24 }}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color={open ? 'error' : 'primary'}
              type="submit"
              variant="contained"
              className={styles.button}
            >
              {loading ? (
                <Spinner wh={30} white={true} />
              ) : open ? (
                'Invalid login'
              ) : (
                'Log in'
              )}
            </Button>
            <div className={styles.forgotbox}>
              <Link className={styles.link2} href="/forgot">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
