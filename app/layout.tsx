import axios from "axios";
import Link from "next/link";
import { config } from '@fortawesome/fontawesome-svg-core';
import { cookies } from 'next/headers';

import SignInAndOutChecker from "@/app/ui/credentials/SignInAndOutChecker"; // Import the client component
import DisclaimerToast from "@/app/ui/Toast"                          // Import the client component
import Footer from '@/app/ui/Footer';                                 // Import the client component
import { baseURL, GSNLogo, bearerToken, userIdCookie} from "@/app/lib/general_variables";

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

const retrieveUserData = async () => {
  const cookieStore = cookies();
  const userIdentifier = (await cookieStore).get(userIdCookie)?.value || "0";

  try {
    const axiosInstance = axios.create({ baseURL: baseURL });
    const response = await axiosInstance.get(`/api/signin?request_type=single&user_id=${userIdentifier}`, {
      headers: {
          Authorization: bearerToken,
      }
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      console.error("Unauthorized access - please check your credentials.");

      return null;
    } else if (response.status === 404) {
      console.error("User not found - please check the user ID.");

      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    throw new Error('Network response was not ok');
  }
}

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
  const userData = await retrieveUserData();

  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <menu className="topNav">
              <div className="topNavSection">
                <Link href="/">
                  <GSNLogo />
                  <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                </Link>
              </div>

              <div className="topNavSection"></div>

              <div className="topNavSection rightLinks">
                <Link href={"/about"}>About</Link> &nbsp;
                <Link href={"/ntks/pricing"}>Pricing</Link> &nbsp;
                <Link href={"/contact"}>Contact</Link> &nbsp;| &nbsp;

                <SignInAndOutChecker userData={userData}/>
              </div>
            </menu>
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
