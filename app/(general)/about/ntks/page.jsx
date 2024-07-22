import Link from "next/link";

// Will list links to all the docs: Terms, disclaimer, site map, etc.
export default function Page() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <section>
        <h2>Some Need to Knows:</h2>

        <Link href={baseURL + "/about/ntks/disclaimer"}>Disclaimer</Link>
        <Link href={baseURL + "/about/ntks/faq"}>FAQ</Link>
        <Link href={baseURL + "/about/ntks/pricing"}>Pricing</Link>
        <Link href={baseURL + "/about/ntks/privacy"}>Privacy</Link>
        <Link href={baseURL + "/about/ntks/sitemap"}>Sitemap</Link>
        <Link href={baseURL + "/about/ntks/terms"}>Terms</Link>
    </section>;
};
