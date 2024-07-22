import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../Components/Navbar';
import style from './index.module.scss';
import { AuroraBackground } from './sparkles';
import { motion } from "framer-motion";
import { cn } from '../../lib/utils';
import Link from 'next/link';

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
    <>
    <p className='text-5xl'>hfebverwu skweoirweero</p>
      <Navbar />
      <p className='text-5xl'>hfebverwu skweoirweero</p>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-8xl font-bold dark:text-white text-center"
          >
            Welcome Here
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4"
          >
            <Link href="/Tree" passHref>
              <motion.a className="hover:underline hover:text-blue-500 transition duration-300">
                Tree
              </motion.a>
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
          >
            <Link href="/Message" passHref>
              <motion.a className="hover:underline hover:text-blue-500 transition duration-300">
                Messages
              </motion.a>
            </Link>
          </motion.button>
        </motion.div>
      </AuroraBackground>
    </>
  );
};

export default Index;
