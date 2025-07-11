import { config } from '@fortawesome/fontawesome-svg-core';

import GuestTopNav from "@/app/ui/nav/top-nav/GuestTopNav";
import DisclaimerToast from "@/app/ui/Toast"                          // Import the client component
import Footer from '@/app/ui/Footer';                                 // Import the client component
import { baseURL } from "@/app/lib/general_variables";

import "@fortawesome/fontawesome-svg-core/styles.css";
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
  publisher: 'Gifted Sounds Network',
  title: 'Gifted Sounds Network',
  twitter: {
    card: 'summary',
    creator: 'TODO',
    creatorId: 'TODO',
    description: "Gifted Sounds is your source of diverse, top-notch podcast, livestreaming, and A/V production studio, providing a unique and immersive experience for viewers by incorporating interactive elements and cutting-edge technology.",
    images: ['TODO'], // Must be an absolute URL
    siteId: 'TODO',
    title: "Gifted Sounds Network",
  },
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
export default async function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <GuestTopNav />
          </nav>
        </header>

        <div id="portal"></div>

        <main className="childrenSection">{children}</main>

        <DisclaimerToast />

        <Footer />
      </body>
    </html>
  );
};
