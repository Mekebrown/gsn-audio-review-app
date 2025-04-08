import Link from "next/link";

import { baseURL, GSNLogo } from "@/app/lib/general_variables";
import "@/styles/navigation/topnav.css";

/**
 * @description Component for a layout that will wrap 
 * around every site page
 * 
 * @param {Object} children
 * 
 * @returns {JSX.Element}
 * <RootLayout children={children} />
 */
export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    try {
        return <>
            <header>
                <nav>
                    <menu className="topNav">
                        <div className="topNavSection">
                            <Link href={baseURL} >
                                <GSNLogo />

                                <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                            </Link>
                        </div>

                        <div className="topNavSection"></div>

                        <div className="topNavSection rightLinks">
                            <Link href={baseURL + "/about"}>About</Link> &nbsp;
                            <Link href={baseURL + "/about/ntks/pricing"}>Pricing</Link> &nbsp;
                            <Link href={baseURL + "/contact"}>Contact</Link> &nbsp;| &nbsp;
                            <Link href={baseURL + "/signin"} className="marginLeftSpacer">Sign In</Link>
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
