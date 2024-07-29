import Image from "next/image";
import Link from "next/link";

import analytics from "@/app/lib/analytics_handler";
import { tempImage } from "@/app/lib/general_variables";
import { baseURL, GSNLogo } from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

analytics.gaEvent('Index Page Loaded');

/**
 * @description Component for the homepage
 *
 * @component
 * 
 * @returns {JSX.Element} <Home />
 */
export default async function Home() {
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

    <section>
      <div className="twoCols">
        <section style={{ paddingTop: "10%", flex: "1", textAlign: "left" }}>
          <h1>Entertaining Others the Way YOU Want</h1>

          <p style={{ width: "50%", marginTop: "5%", marginBottom: "5%" }}>
            The Gifted Sounds Network&lsquo;s Audio Review App is a straightforward audio player and notes taker that lets you give real-time feedback on your recordings. <br /><br />Since you&lsquo;re the primary visionary, we do as you say.
          </p>
        </section>

        <section style={{ flex: "1" }}>
          <Image
            src={tempImage}
            alt="Right-hand image"
            width="400"
            height="400"
          />
        </section>
      </div>
    </section>
  </>;
};
