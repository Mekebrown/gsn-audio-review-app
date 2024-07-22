import Link from 'next/link';
import Image from 'next/image';

import "@/styles/header.module.css";

export default function Header() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const logo = "/logo192.png";

    return <header>
        <nav>
            <menu style={{ display: "flex" }}>
                <div className="topNavSection" style={{ flex: "1" }}>
                    <Link
                        href="/"
                    >
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
