import Link from "next/link";
import { cookies } from 'next/headers';

import SignInAndOutChecker from "@/app/ui/credentials/SignInAndOutChecker";
import { GSNLogo, signInUsernameCookie} from "@/app/lib/general_variables";
 
export default async function GuestTopNav() {
    const cookieStore = cookies();
    const username = (await cookieStore).get(signInUsernameCookie)?.value;

    return <menu className="topNav">
        <div className="topNavSection">
            <Link href="/">
                <GSNLogo />
                <span className="topNavLeftGSNText">Gifted Sounds Network</span>
            </Link>
        </div>

        <div className="topNavSection"></div>

        <div className="topNavSection rightLinks">
            <Link href={"/about"}>About</Link> &nbsp;
            <Link href={"/ntks/pricing"}>Pricing</Link> &nbsp;
            <Link href={"/contact"}>Contact</Link> &nbsp;| &nbsp;

            <SignInAndOutChecker userData={username}/>
        </div>
    </menu>;
};