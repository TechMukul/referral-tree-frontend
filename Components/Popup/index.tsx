// Popup.tsx

import React from 'react';
import styles from './index.module.scss'; // Adjust the import path based on your project structure

interface PopupProps {
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  parentId: string;
  selectedOption: 'left' | 'right';
}

const Popup: React.FC<PopupProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    password: '',
    parentId: '',
    selectedOption: 'left', // Default to left
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onCancel}>
          <i className="fas fa-times"></i>
        </button>
        <h2>Add new user</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Relation</label>
            <select
              value={formData.selectedOption}
              onChange={handleChange}
              name="selectedOption"
            >
              <option value="left">Left Child</option>
              <option value="right">Right Child</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
