import Link from 'next/link';
// import { useSession } from "next-auth/react";

import TopNav from "@/app/ui/menu/portal/TopNav";
import { baseURL, GSNLogo } from "@/app/lib/general_variables";

import "@/styles/header.module.css";

export default function PortalHeader() {
    const { data: session, status } = { data: "client", status: "authenticated" }; //useSession();

    const weGotAUser = session && session.user ? session.user : false;
    const weGotAnAdmin = weGotAUser && session.user.role === "admin";
    const weGotAnEmail = weGotAUser && session.user.email ? session.user.email : false;

    return <header>
        <nav>
            <menu className="topNav" style={{ display: "flex" }}>
                <div className="topNavSection" style={{ flex: "1" }}>
                    <Link href={baseURL} >
                        <GSNLogo />
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
