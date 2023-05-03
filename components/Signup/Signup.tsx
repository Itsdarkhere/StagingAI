'use client';
import React, { useState } from 'react';
import styles from '../../styles/Signup.module.css';
import Link from 'next/link';
import { Alert, Button, Snackbar } from '@mui/material';
import Spinner from '../Spinner';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Check that passwords match
    if (password !== repeatPassword) {
        setMessage('Passwords dont match!');
        handleOpen();
        setPassword('');
        setRepeatPassword('');
        return;
    }

    setMessage('Signup is not available!');
    handleOpen();
    return;

    const reqData = {
        email,
        password,
      };

    const response = await fetch(`/api/auth/signup123`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    }).then((res) => res.json());

    if (response?.message) {
        console.log("Success!")
    } else {
        console.log(response);
    }
  };


  return (
    <div className={styles.container}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <div className={styles.innercontainer}>
        <div className={styles.box}>
          <div className={styles.textbox}>
            <div className={styles.textboxinner}>
              <span className={styles.span}>Create an account</span>
              <p className={styles.p}>
                Already have an account?{' '}
                <Link className={styles.link} href="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              className={styles.input}
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              name="password"
              className={styles.input}
              type="password"
              placeholder="Password"
              required
              minLength={5}
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="repeat" className={styles.label}>
              Repeat password
            </label>
            <input
              name="repeat"
              className={styles.input}
              type="password"
              placeholder="Password"
              required
              minLength={5}
              maxLength={20}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              color={open ? 'error' : 'primary'}
              type="submit"
              variant="contained"
              className={styles.button}
            >
              {loading ? <Spinner wh={30} white={true} /> : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
