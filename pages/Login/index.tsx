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
    try {
      const loginResponse = await axios.post('https://www.referback.trollsufficient.com/admin/login', {
        email,
        password,
      });
      const { token,role } = loginResponse.data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('role',role)
      console.log("login",role)

      // Fetch user details to get the name
      const userResponse = await axios.post(
        'https://www.referback.trollsufficient.com/admin/user',
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const userName = userResponse.data.name;
      localStorage.setItem('userName', userName); // Store the user's name in local storage

      // Fetch user's coins
      const coinsResponse = await axios.post(
        'https://www.referback.trollsufficient.com/admin/coins',
        { email },
      );

      // Log the entire response to check its structure
      console.log('coinsResponse:', coinsResponse);

      const userCoins = coinsResponse.data.Coins;

      localStorage.setItem('userCoins', userCoins); 

      router.push({
        pathname: '/home',
        query: { name: userName },
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
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
               autoComplete="current-username"
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
                  autoComplete="current-password"
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
};

export default Index;
