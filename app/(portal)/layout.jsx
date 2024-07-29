import TopNav from '@/app/ui/nav/top-nav/TopNav.jsx';
import SideNav from '@/app/ui/nav/side-nav/SideNav';
import Player from '@/app/ui/Player';
import { singleMediaTrackExample } from "@/app/lib/media_placeholders";
import { GeneralToast } from "@/app/ui/Toast"

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
    // const [toastMessage, setToastMessage] = useState(null);
    const toastMessage = "A TODO";

    return <>
        <TopNav />

        <GeneralToast message={toastMessage} />

        <main className="children">{children}</main>

        <SideNav status={status} />

        <Player
            title={singleMediaTrackExample.title}
            track={[
                singleMediaTrackExample.mp3,
                singleMediaTrackExample.ogg
            ]}
            desc={singleMediaTrackExample.description}
            captions={singleMediaTrackExample.captions}
        />
    </>;
};
