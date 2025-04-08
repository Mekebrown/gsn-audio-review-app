import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import { getCookie, setCookie } from 'cookies-next';

import Footer from '@/app/ui/Footer';
import DisclaimerToast from "@/app/ui/Toast"
import { baseURL, gsnVisitedSiteCookie, gsnDisclaimerChoice, gsnSignInCookie, userId } from "@/app/lib/general_variables";

import "@/styles/globals.css";
import "@/styles/layout.css";

config.autoAddCss = false; /* eslint-disable import/first */

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
    icon: '/media/imgs/logo192.png',
    shortcut: '/media/imgs/favicon.ico',
    apple: '/media/imgs/logo192.png',
  },
  keywords: ['GSN', 'Gifted Sounds Network', 'Lance John', "podcast", "audio", "video", "production", "editing", "media", "digital", "live streaming", "studio"],
  manifest: '/manifest.json',
  metadataBase: baseURL,
  name: 'Gifted Sounds Network',
  publisher: 'Gifted Sounds Network',
  title: 'Gifted Sounds Network',
  twitter: {
    card: 'summary',
    creator: 'TODO', // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    creatorId: 'TODO',
    description: "Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology.",
    images: ['TODO'], // Must be an absolute URL
    siteId: 'TODO',
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
export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
  if (!getCookie(gsnVisitedSiteCookie)) {
    setCookie(gsnVisitedSiteCookie, true);
  }

  if (!getCookie(gsnDisclaimerChoice)) {
    setCookie(gsnDisclaimerChoice, true);
  }

  if (!getCookie(gsnSignInCookie)) {
    setCookie(gsnSignInCookie, "sign-in-cookie");
  }

  if (!getCookie(userId)) {
    setCookie(userId, 1);
  }

  return (
    <html lang="en">
      <body>
        <div id="portal"></div>

        <main className="childrenSection">{children}</main>

        <DisclaimerToast />

        <Footer />
      </body>
    </html>
  );} catch (error: any) {
    throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
  }
};
