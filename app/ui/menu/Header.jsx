import Link from 'next/link';

import { baseURL, GSNLogo } from "@/app/lib/general_variables";

import "@/styles/header.module.css";

export default function Header() {
    return <header>
        <nav>
            <menu style={{ display: "flex" }}>
                <div className="topNavSection" style={{ flex: "1" }}>
                    <Link
                        href="/"
                    >
                        <GSNLogo />
                        <span>Gifted Sounds Network</span>
                    </Link>
                </div>

                <div className="topNavSection" style={{ flex: "1" }}>
                </div>

                <div className="topNavSection" style={{ flex: "1" }}>
                    <nav>
                        <Link href={baseURL + "/about"}>About</Link> &nbsp;
                        <Link href={baseURL + "/about/ntks/pricing"}>Pricing</Link> &nbsp;
                        <Link href={baseURL + "/contact"}>Contact</Link> &nbsp;| &nbsp;
                        <Link href={baseURL + "/signin"}>Sign In</Link>
                    </nav>
                </div>
            </menu>
        </nav>
    </header>;
};
