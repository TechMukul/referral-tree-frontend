"use client"
import React from 'react';
import { useAuth } from '../../store/store';
import { useRouter } from 'next/navigation';
import Dashboard from './Dashboard/dashboard'


const Page = () => {
  const router = useRouter();

 React.useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    
    // Redirect only if token doesn't exist
    if (!token) {
      router.push('/login'); // Redirect to login page
    }
  }, [router]);
  return (
    <div>
      <Dashboard/>
    </div>
  );
};

export default Page;
