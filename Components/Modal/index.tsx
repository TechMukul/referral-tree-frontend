import React from 'react';
import styles from './index.module.scss'; // Import CSS module for styling

const Modal = ({ show, onClose, castle, handleInputChange, handleSave }:any) => {
  if (!show || !castle) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Castle</h2>
        <form>
          {/* Skin Type */}
          <div className={styles.inputContainer}>
            <label>Skin Type</label>
            <input
              type="text"
              value={castle.skintype}
              onChange={(e) => handleInputChange('skintype', e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div className={styles.inputContainer}>
            <label>Photo URL</label>
            <input
              type="text"
              value={castle.photo[0]} // Assuming photo is an array, take the first element
              onChange={(e) => handleInputChange('photo', [e.target.value])} // Convert value to array
            />
          </div>

          {/* Castles (multiple values) */}
          <div className={styles.inputContainer}>
            <label>Castles</label>
            <input
              type="text"
              value={castle.castles.join(', ')} // Join array elements with a comma and space
              onChange={(e) => handleInputChange('castles', e.target.value.split(',').map(item => item.trim()))} // Split by comma and trim whitespace
            />
          </div>

          {/* Quantity */}
          <div className={styles.inputContainer}>
            <label>Quantity</label>
            <input
              type="number"
              value={castle.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </div>

          {/* Permalink */}
          <div className={styles.inputContainer}>
            <label>Permalink</label>
            <input
              type="text"
              value={castle.permalink}
              onChange={(e) => handleInputChange('permalink', e.target.value)}
            />
          </div>

          {/* Buff (multiple values) */}
          <div className={styles.inputContainer}>
            <label>Buff</label>
            <input
              type="text"
              value={castle.buff.join(', ')} // Join array elements with a comma and space
              onChange={(e) => handleInputChange('buff', e.target.value.split(',').map(item => item.trim()))} // Split by comma and trim whitespace
            />
          </div>

          {/* Save and Cancel buttons */}
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
