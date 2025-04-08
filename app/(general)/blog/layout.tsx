import Link from "next/link";

import { baseURL, GSNLogo } from "@/app/lib/general_variables";
import "@/styles/navigation/topnav.css";

/**
 * @returns {JSX.Element}
 */
export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    try {
        const baseURLString = baseURL ?baseURL : "http://localhost:3000";
        
        return <>
            <header>
                <nav>
                    <menu className="topNav">
                        <div className="topNavSection">
                            <Link href={baseURLString} >
                                <GSNLogo />

                                <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                            </Link>
                        </div>

                        <div className="topNavSection"></div>

                        <div className="topNavSection rightLinks">
                            <Link href={baseURLString + "/about"}>About</Link> &nbsp;
                            <Link href={baseURLString + "/about/ntks/pricing"}>Pricing</Link> &nbsp;
                            <Link href={baseURLString + "/contact"}>Contact</Link> &nbsp;| &nbsp;
                            <Link href={baseURLString + "/signin"} className="marginLeftSpacer">Sign In</Link>
                        </div>
                    </menu>
                </nav>
            </header>

            <main className="children">{children}</main>
        </>;
    } catch (error: any) {
        throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
    }
};
