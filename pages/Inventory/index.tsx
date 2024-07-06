import React, { useState } from 'react';
import axios from 'axios';
import styles from './Index.module.scss';
import Dashboard from '../../Components/Dashboardleft';
import Navbar from '../../Components/Navbar';

const Index = () => {
  const [skintype, setSkintype] = useState('');
  const [photo, setPhoto] = useState(['']);
  const [castles, setCastles] = useState(['']);
  const [quantity, setQuantity] = useState('');
  const [permalink, setPermalink] = useState('');
  const [buff, setBuff] = useState(['']);

  const handlePhotoChange = (index: number, value: string) => {
    const newPhoto = [...photo];
    newPhoto[index] = value;
    setPhoto(newPhoto);
  };

  const handleCastlesChange = (index: number, value: string) => {
    const newCastles = [...castles];
    newCastles[index] = value;
    setCastles(newCastles);
  };

  const handleBuffChange = (index: number, value: string) => {
    const newBuff = [...buff];
    newBuff[index] = value;
    setBuff(newBuff);
  };

  const addPhotoField = () => setPhoto([...photo, '']);
  const addCastlesField = () => setCastles([...castles, '']);
  const addBuffField = () => setBuff([...buff, '']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      skintype,
      photo,
      castles,
      quantity,
      permalink,
      buff,
    };

    const token = localStorage.getItem('accessToken'); // Assuming the token is stored with this key

    try {
      const response = await axios.post('http://localhost:3000/data/machine', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Dashboard />
        <div className={styles.formContainer}>
          <h1>Add Skins Here</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="skintype">Skin Type</label>
              <input
                type="text"
                id="skintype"
                value={skintype}
                onChange={(e) => setSkintype(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Photo URLs</label>
              {photo.map((url, index) => (
                <div key={index} className={styles.dynamicField}>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handlePhotoChange(index, e.target.value)}
                  />
                  {index === photo.length - 1 && (
                    <button type="button" onClick={addPhotoField}>Add Photo</button>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.formGroup}>
              <label>Castles</label>
              {castles.map((castle, index) => (
                <div key={index} className={styles.dynamicField}>
                  <input
                    type="text"
                    value={castle}
                    onChange={(e) => handleCastlesChange(index, e.target.value)}
                  />
                  {index === castles.length - 1 && (
                    <button type="button" onClick={addCastlesField}>Add Castle</button>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="permalink">Permalink</label>
              <input
                type="text"
                id="permalink"
                value={permalink}
                onChange={(e) => setPermalink(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Buff</label>
              {buff.map((buffItem, index) => (
                <div key={index} className={styles.dynamicField}>
                  <input
                    type="text"
                    value={buffItem}
                    onChange={(e) => handleBuffChange(index, e.target.value)}
                  />
                  {index === buff.length - 1 && (
                    <button type="button" onClick={addBuffField}>Add Buff</button>
                  )}
                </div>
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
