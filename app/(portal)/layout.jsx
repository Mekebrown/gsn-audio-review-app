import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import SideNav from '@/app/ui/nav/side-nav/SideNav';
import Player from '@/app/ui/Player';
import { singleMediaTrackExample } from "@/app/lib/media_placeholders";
import { gsnSignInCookie } from "@/app/lib/general_variables";

export default async function RootLayout({ children }) {
    const cookieStore = cookies();
    const userIdentifier = (await cookieStore).get(gsnSignInCookie)?.value;

    if (userIdentifier === undefined) {
        redirect('/signin');

        return null;
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
