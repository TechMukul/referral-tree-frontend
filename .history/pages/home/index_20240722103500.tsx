import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import style from './index.module.scss';
import {BoxesCore} from './sparkles'
import {cn} from '../../lib/utils'
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
    <div style={{width:"100%",height:"230vh"}}>
       <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
      <BoxesCore />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Framer motion is the best animation library ngl
      </p>
    </div>
      {/* <Navbar />
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
      </div> */}
      {/* <BoxesCore /> */}
      {/* <Dashboardleft /> */}
    </div>
  );
};

export default Index;
