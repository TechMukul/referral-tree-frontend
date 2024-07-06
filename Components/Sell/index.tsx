import React from 'react';
import styles from './index.module.scss'; // Import CSS module for styling

const Sell = ({ show, onClose, castle, handleInputChange, handleSave }) => {
  if (!show || !castle) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Sell Castle</h2>
        <form>
          {/* Customer Name */}
          <div className={styles.inputContainer}>
            <label>Customer Name</label>
            <input
              type="text"
              value={castle.customerName || ''}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
            />
          </div>

          {/* Skin Type */}
          <div className={styles.inputContainer}>
            <label>Skin Type</label>
            <input
              type="text"
              value={castle.skintype || ''}
              onChange={(e) => handleInputChange('skintype', e.target.value)}
            />
          </div>

          {/* Quantity of Skins Sold */}
          <div className={styles.inputContainer}>
            <label>Quantity of Skins Sold</label>
            <input
              type="number"
              value={castle.quantitySold || ''}
              onChange={(e) => handleInputChange('quantitySold', e.target.value)}
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

export default Sell;
