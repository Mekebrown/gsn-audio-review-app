import { Html, Head, Main, NextScript } from 'next/document';

import NavBar from '../components/menu/NavBar';
import Footer from '../components/menu/Footer';

export default function Document() {
  return <Html lang="en">
      <Head>
        {/* General tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="Accept-CH" content="Sec-CH-UA-Platform-Version, Sec-CH-UA-Model" />
        <meta name="description" content="Gifted Sounds Network Audio Review, an app presenting clients with unapproved tracks to take notes, listen to and review at their leisure." />
        <meta itemProp="name" content="Gifted Sounds Network"/>
        <meta itemProp="url" content="https://www.giftedsounds.com/studios"/>
        <meta itemProp="description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>

        {/* OpenGraph (Facebook) meta tags */}
        <meta property="og:site_name" content="Gifted Sounds Network"/>
        <meta property="og:title" content="Gifted Sounds Network"/>
        <meta property="og:url" content="https://www.giftedsounds.com/studios"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>

        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Gifted Sounds Network"/>
        <meta name="twitter:url" content="https://www.giftedsounds.com/studios"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>
        
        {/* Various icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="canonical" href="https://www.giftedsounds.com/studios"/>
        <link rel="apple-touch-icon" href="/logo192.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <body>
        <NavBar />

        <Main />

        <NextScript />

        <Footer />
      </body>
    </Html>;
}
