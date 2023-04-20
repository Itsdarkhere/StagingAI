import React, { useEffect, useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';
import Spinner from '../Spinner';

export default function Login({handleLogin}: {handleLogin: () => void}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Data to send to the API
    const reqData = {
      email,
      password,
    }

    // Perform authentication logic here (e.g., call an API)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });

    if (res?.ok) {
      const data = await res.json();
      const jwt = data.token;
      localStorage.setItem('authToken', jwt);
      handleLogin();
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 750) 
    }
  };


  // If we have a valid JWT, we can log the user in
  const checkJWT = async (authToken: string) => {
    // Perform authentication logic here (e.g., call an API)
    const res = await fetch('/api/auth/checkJWT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authToken
      },
    });

    if (res?.ok) {
      handleLogin();
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      console.log('authToken', authToken);
      checkJWT(authToken);
    }
  }, [])

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
            <Button color={error ? 'error' : 'primary'} type="submit" variant="contained" className={styles.button}>
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
