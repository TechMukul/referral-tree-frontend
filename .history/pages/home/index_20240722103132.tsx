import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import style from './index.module.scss';
import {BoxesCore} from './sparkles'

const Index = () => {
  // const router = useRouter(); // Initialize useRouter hook

  // useEffect(() => {
  //   // Check if token exists in localStorage
  //   const token = localStorage.getItem('token');

  //   // If token does not exist, redirect to login page
  //   if (!token) {
  //     router.push('/login'); // Redirect to login page using router.push
  //   }
  // }, [router]); // useEffect depends on router

  return (
    <div>
      <Navbar />
      <div className={style.content}>
        <div className={style.imageWrapper}>
          <img
            src='https://www.shutterstock.com/image-illustration/bitcoins-3d-render-isolated-cryptocurrency-600nw-1875857281.jpg'
            className={style.img}
            alt="Admin Panel"
          />
          <div className={style.header}>
            <h1>Welcome</h1>
          </div>
        </div>
      </div>
      {/* <Dashboardleft /> */}
    </div>
  );
};

export default Index;
