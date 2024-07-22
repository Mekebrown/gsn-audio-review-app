import { Inter } from 'next/font/google';

import Header from '@/app/ui/menu/Header';
import Footer from '@/app/ui/menu/Footer';
import TempUniversalNav from '@/app/ui/menu/TempUniversalNav';
import DisclaimerToast from "@/app/ui/credentials/Toast"

import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/en-US', },
  },
  authors: [{ name: 'Lance John' }, { name: 'Meke Brown', url: 'https://www.mekesiabrown.com' }],
  category: 'Multimedia production studio',
  creator: 'Gifted Sounds Network',
  description: "Gifted Sounds Network Audio Review, an app presenting clients with recently-drafted tracks to take notes, listen to and review at their leisure.",
  icons: {
    icon: '/logo192.png',
    shortcut: '/favicon.ico',
    apple: '/logo192.png',
  },
  keywords: ['GSN', 'Gifted Sounds Network', 'Lance John', "podcast", "audio", "video", "production", "editing", "media", "digital", "live streaming", "studio"],
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.BASE_URL),
  name: 'Gifted Sounds Network',
  publisher: 'Gifted Sounds Network',
  title: 'Gifted Sounds Network',
  twitter: {
    card: 'summary',
    creator: 'tbd', // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    creatorId: 'tbd',
    description: "Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology.",
    images: ['tbd'], // Must be an absolute URL
    siteId: 'tbd',
    title: "Gifted Sounds Network",
    url: "https://www.giftedsounds.com/studios"
  },
  url: "https://www.giftedsounds.com/studios",
};

/**
 * @description Component for a layout that will wrap 
 * around every site page
 * 
 * @param {Object} children
 * 
 * @returns {JSX.Element}
 * <RootLayout children={children} />
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <TempUniversalNav />

        <div id="portal"></div>

        <main className="children">{children}</main>

        <DisclaimerToast />

        <Footer />
      </body>
    </html>
  );
};
