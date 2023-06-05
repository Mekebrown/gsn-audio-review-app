import React from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import "../styles/globals.css";

function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return <SessionProvider session={session}>
      <Head>
        <title>GSN Audio Review App</title>
      </Head>
      
      <Component {...pageProps} />

      <div id="portal"></div>
  </SessionProvider>;
}

export default App;
