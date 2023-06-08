import React from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import NavBar from '../components/menu/NavBar';
import Footer from '../components/menu/Footer';
import "../styles/globals.css";

function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return <SessionProvider session={session}>
    <Head>
      <title>GSN Audio Review App</title>
    </Head>
    
    <NavBar />

    <Component {...pageProps} />

    <div id="portal"></div>

    <Footer />
  </SessionProvider>;
}

export default App;
