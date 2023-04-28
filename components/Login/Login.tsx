'use client';
import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    signIn('credentials', {
      email,
      password,
      // Redirect to create
      callbackUrl: '/create',
    });
  };

  return (
    <div className={styles.container}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              style={{ marginTop: 24 }}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color={error ? 'error' : 'primary'}
              type="submit"
              variant="contained"
              className={styles.button}
            >
              {error ? 'Invalid login' : 'Login'}
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
