// pages/_app.tsx
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return(
  //  <Component {...pageProps} />
  <p className='text-red-500'>Hello</p>
  )
}

export default MyApp;
