import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";
// Will list links to all the docs: Terms, disclaimer, site map, etc.

/**
 * @returns {JSX.Element}
 */
export default function Page() {
    try {
        const baseURLString = baseURL ? baseURL : "http://localhost:3000";

        return <section>
            <h2>Some Need to Knows:</h2>

            <Link href={baseURLString + "/ntks/disclaimer"}>Disclaimer</Link>
            <Link href={baseURLString + "/ntks/faq"}>FAQ</Link>
            <Link href={baseURLString + "/ntks/pricing"}>Pricing</Link>
            <Link href={baseURLString + "/ntks/privacy"}>Privacy</Link>
            <Link href={baseURLString + "/ntks/sitemap"}>Sitemap</Link>
            <Link href={baseURLString + "/ntks/terms"}>Terms</Link>
        </section>;
    } catch (error: any) {
        throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
    }
};
