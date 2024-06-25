"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    
    // Redirect only if token doesn't exist
    if (!token) {
      router.push('/Login'); // Redirect to login page
    }
  }, [router]);

  return <div>Bhai login krle</div>; // This component just handles redirection
};

export default LoginPage;
