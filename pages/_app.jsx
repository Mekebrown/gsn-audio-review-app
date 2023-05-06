import React from 'react';
import Head from 'next/head';

import AuthContextProvider from "../lib/context/AuthContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return <AuthContextProvider>
      <Head>
        <title>GSN Audio Review App</title>
      </Head>
      
      <Component {...pageProps} />
  </AuthContextProvider>;
}

export default App;
