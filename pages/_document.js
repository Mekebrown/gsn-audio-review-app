import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return <Html lang="en">
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta http-equiv="Accept-CH" content="Sec-CH-UA-Platform-Version, Sec-CH-UA-Model" />
        
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="canonical" href="https://www.giftedsounds.com/studios"/>

        <meta property="og:site_name" content="Gifted Sounds Network"/>
        <meta property="og:title" content="Gifted Sounds Network"/>
        <meta property="og:url" content="https://www.giftedsounds.com/studios"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>

        <meta itemprop="name" content="Gifted Sounds Network"/>
        <meta itemprop="url" content="https://www.giftedsounds.com/studios"/>
        <meta itemprop="description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>

        <meta name="twitter:title" content="Gifted Sounds Network"/>
        <meta name="twitter:url" content="https://www.giftedsounds.com/studios"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology."/>

        <meta name="description" content="Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology. We are a Black-owned business in Hartsdale, NY with affordable prices, a thorough initiative, and guaranteed fun times. Contact us today!" />
        
        <script type="application/ld+json">
          {"url":"https://www.giftedsounds.com/studios","name":"Gifted Sounds Network","description":"","@context":"http://schema.org","@type":"WebSite"}
        </script>
        <script type="application/ld+json">
          {"legalName":"","address":"","email":"giftedsoundsnetwork@gmail.com","telephone":" (646) 893-9658 ","sameAs":[],"@context":"http://schema.org","@type":"Organization"}
        </script>
        <script type="application/ld+json">
          {"address":"","name":"","openingHours":", , , , , , ","@context":"http://schema.org","@type":"LocalBusiness"}
        </script>
      
        <title>Gifted Sounds Network Audio Review App</title>
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>;
}
