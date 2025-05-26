import { redirect } from 'next/navigation';

import SideNav from '@/app/ui/nav/side-nav/SideNav';
import Player from '@/app/ui/Player';
import { singleMediaTrackExample } from "@/app/lib/media_placeholders";

export default function RootLayout({ children }) {
    const { data: session, status } = { data: "user", status: "authenticated" }; //useSession();?

    if (status === "unauthenticated") {
        redirect('/signin');
    } else if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return <>
        <SideNav />

        <main className="children">{children}</main>

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
