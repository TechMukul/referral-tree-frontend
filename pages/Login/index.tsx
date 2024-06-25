import React, { useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

const Index = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hello");
    try {
      console.log("hello1");
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      console.log('Token stored in local storage:', token);
      router.push('/home');
      
    } catch (error) {
      setError('Invalid');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
            <div className={styles.inputUnderline}></div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <div className={styles.inputUnderline}></div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
