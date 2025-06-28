import Link from "next/link";

/**
 * @returns {JSX.Element}
 */
export default function Page() {
    return <section>
        <h2>Sitemap:</h2>

        <Link href={"/about"}>About</Link><br />
        <Link href={"/blog"}>Blog</Link><br />
        <Link href={"/contact"}>Contact</Link><br />
        <Link href={"/signin"}>Signin</Link><br />
        <Link href={"/account"}>User Dashboard</Link><br />
        <hr />
        <Link href={"/ntks/disclaimer"}>disclaimer</Link><br />
        <Link href={"/ntks/faq"}>FAQ</Link><br />
        <Link href={"/ntks/instructions"}>Instructions</Link><br />
        <Link href={"/ntks/pricing"}>Pricing</Link><br />
        <Link href={"/ntks/privacy"}>Privacy</Link><br />
        <Link href={"/ntks"}>Sitemap</Link><br />
        <Link href={"/ntks/terms"}>Terms</Link><br />
        <hr />
        <Link href={"/account/1"}>Admin-Only: A specific user</Link><br />
        <Link href={"/account/new"}>Admin-Only: Send a UN/PW to a new user</Link><br />
        <Link href={"/account/all"}>Admin-Only: Seeing all users</Link><br />

        <Link href={"/media"}>All media (assigned or total (Admin-Only))</Link><br />
        <Link href={"/media/1"}>A specific track</Link><br />
        <Link href={"/media/new"}>Admin-Only: Upload a single track</Link><br />

        <Link href={"/notes"}>All notes</Link>
    </section>;
};
