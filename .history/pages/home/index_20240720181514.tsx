import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import style from './index.module.scss';
import AuroraBackground from '../../Components/Sparkles/sparkles'; // Adjust path based on your project structure

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
    // <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
    //   <Navbar /> {/* Render Navbar component */}
    //   <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-image:radial-gradient(transparent,white) pointer-events-none" />

    //   <AuroraBackground className="absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0" />
      
    //   <h1 className="md:text-4xl text-xl text-white relative z-20">
    //     Tailwind is Awesome
    //   </h1>
    //   <p className="text-center mt-2 text-neutral-300 relative z-20">
    //     Framer motion is the best animation library ngl
    //   </p>
    // </div>
    <> <AuroraBackground>
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Background lights are cool you know.
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        And this, is chemical burn.
      </div>
      <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Debug now
      </button>
    </motion.div>
  </AuroraBackground></>
  );
};

export default Index;
