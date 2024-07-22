import Link from 'next/link';
import Image from 'next/image';
// import { useSession } from "next-auth/react";

import TopNav from "@/app/ui/menu/portal/TopNav";

import "@/styles/header.module.css";

export default function PortalHeader() {
    const { data: session, status } = { data: "client", status: "authenticated" }; //useSession();

    const weGotAUser = session && session.user ? session.user : false;
    const weGotAnAdmin = weGotAUser && session.user.role === "admin";
    const weGotAnEmail = weGotAUser && session.user.email ? session.user.email : false;

    const logo = "/logo192.png";
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <header>
        <nav>
            <menu className="topNav" style={{ display: "flex" }}>
                <div className="topNavSection" style={{ flex: "1" }}>
                    <Link href={baseURL} >
                        <Image
                            src={logo}
                            alt="GSN Logo"
                            width={35}
                            height={35}
                        />
                        <span>Gifted Sounds Network</span>
                    </Link>
                </div>

                <div className="topNavSection" style={{ flex: "1" }}>
                </div>

                <div className="topNavSection" style={{ flex: "1" }}>
                    <nav>
                        <TopNav />
                    </nav>
                </div>
            </menu>
        </nav>
    </header>;
};
