import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";
// Will list links to all the docs: Terms, disclaimer, site map, etc.
export default function Page() {
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
