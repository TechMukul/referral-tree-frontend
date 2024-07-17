import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
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

  const [parentId, setParentId] = useState('');
  const [selectedOption, setSelectedOption] = useState('left');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      console.log("ff",formData)
      let apiEndpoint = '';
      if (selectedOption === 'left') {
        apiEndpoint = `http://localhost:3000/admin/add-left-child/${parentId}`;
      } else if (selectedOption === 'right') {
        apiEndpoint = `http://localhost:3000/admin/add-right-child/${parentId}`;
      }

      const token = localStorage.getItem('accessToken'); // Assuming the token is stored with this key

      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to add child');
      }

      console.log('Child added successfully:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'auto' }}>
        <Dashboard />
        <div className={styles.signupformcontainer}>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <h2>Add new user</h2>
            {error && <div className={styles.error}>{error.message}</div>}
            {success && <div className={styles.success}>User added successfully!</div>}
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
            <div className={styles.formGroup}>
              <label htmlFor="parentId">Parent ID</label>
              <input
                type="text"
                id="parentId"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                required
              />
            </div>
            <label>Relation</label>
            <div className={styles.formGroup} style={{display:"flex",gap:"20px",justifyContent:"center "}}>
              
              <div>
                <input
                  type="radio"
                  id="left"
                  name="relation"
                  value="left"
                  checked={selectedOption === 'left'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label htmlFor="left">Left Child</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="right"
                  name="relation"
                  value="right"
                  checked={selectedOption === 'right'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label htmlFor="right">Right Child</label>
              </div>
            </div>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
