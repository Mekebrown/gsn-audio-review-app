import Link from "next/link";

/**
 * @description Component for temporarily 
 * showing every page
 *
 * @component
 * 
 * @returns {JSX.Element}
 */
export default function TempUniversalNav() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <section style={{ textAlign: "left", display: "flex" }}>
        <article style={{ flex: 1 }}>
            <p>General pages</p>
            <br />
            <ul>
                <li>
                    <Link href={baseURL + "/about"}>About</Link> | &nbsp;
                    <Link href={baseURL + "/blog"}>blog</Link> | &nbsp;
                    <Link href={baseURL + "/contact"}>contact</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/disclaimer"}>disclaimer</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/faq"}>faq</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/pricing"}>pricing</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/privacy"}>privacy</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/sitemap"}>sitemap</Link> | &nbsp;
                    <Link href={baseURL + "/about/ntks/terms"}>terms</Link> | &nbsp;
                    <Link href={baseURL + "/signin"}>signin</Link>
                </li>
            </ul>
        </article>

        <article style={{ flex: 1 }}>
            <p>Pages to be logged in to see:</p>
            <br />
            <ul>
                <li>
                    <Link href={baseURL + "/media"}>All media</Link> | &nbsp;
                    <Link href={baseURL + "/media/1"}>A single track</Link> | &nbsp;
                    <Link href={baseURL + "/media/new"}>Admin: Upload a single track</Link> | &nbsp;
                    <Link href={baseURL + "/notes"}>Admin: All notes</Link> | &nbsp;
                    <Link href={baseURL + "/notes/1"}>Admin: A single note, in a modal</Link> | &nbsp;
                    <Link href={baseURL + "/account"}>Dashboard</Link> | &nbsp;
                    <Link href={baseURL + "/account/1"}>A single user</Link> | &nbsp;
                    <Link href={baseURL + "/account/new"}>Send a UN/PW to a new user</Link> | &nbsp;
                    <Link href={baseURL + "/account/all"}>Admin: Seeing all users</Link>
                </li>
            </ul>
        </article>
    </section>;
};
