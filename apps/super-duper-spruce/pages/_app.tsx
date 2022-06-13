import { AppProps } from 'next/app';
import Head from 'next/head';
import { VechaiProvider } from '@vechaiui/react';
import './styles.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <VechaiProvider>
      <Head>
        <title>Welcome to super-duper-spruce!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </VechaiProvider>
  );
}

export default CustomApp;
