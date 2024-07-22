// pages/_app.tsx
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Ensure this path is correct

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
