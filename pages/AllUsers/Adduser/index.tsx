import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import Navbar from '../../Components/Navbar';
import Dashboard from '../../Components/Dashboardleft';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const result = await response.json();
      console.log('Signup successful:', result);
      setSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Dashboard />
        <div className={styles.signupformcontainer}>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <h2>Add new user</h2>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>Signup successful!</div>}
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <FontAwesomeIcon icon={faUser} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.button} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
