// import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';

import PortalHeader from '@/app/ui/menu/portal/PortalHeader';
import SideNav from '@/app/ui/menu/SideNav';
import Player from '@/app/ui/Player';

import "@/styles/portalheader.module.css";

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({ children }) {
    const { status } = { status: "authenticated" };
    // useSession(); Status can be "loading", "authenticated", or "unauthenticated"

    return <>
        <main className="children">{children}</main>

        <SideNav status={status} />

        <Player />
    </>;
};
