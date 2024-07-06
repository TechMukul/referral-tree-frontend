// pages/dashboard.js
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '../../../Components/Dashboardleft';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    
    // Redirect only if token doesn't exist
    if (!token) {
      router.push('/login'); // Redirect to login page
    }
  }, [router]);

  // Define the handleSelect function
  const handleSelect = (category:any, actionType:any) => {
    console.log(`Selected category: ${category}, action: ${actionType}`);
  };

  return (
    <div>
      
      <Dashboard  />
    </div>
  );
};

export default Page;
