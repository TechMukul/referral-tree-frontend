import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import Dashboardleft from '../../Components/Dashboardleft';

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If token does not exist, redirect to login page
    if (!token) {
      router.push('/login'); // Redirect to login page using router.push
    }
  }, [router]); // useEffect depends on router

  return (
    <div>
      <Navbar />
      <Dashboardleft />
    </div>
  );
};

export default Index;
