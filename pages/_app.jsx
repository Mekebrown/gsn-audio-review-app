import React from 'react';
import Head from 'next/head';

import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return <>
      <Head>
        <title>GSN Audio Review App</title>
      </Head>
      
      <Component {...pageProps} />
  </>;
}

export default App;
