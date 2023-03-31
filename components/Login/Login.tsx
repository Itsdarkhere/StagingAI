import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';

export default function Login({ handleLogin }: { handleLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform authentication logic here (e.g., call an API)
    handleLogin();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
