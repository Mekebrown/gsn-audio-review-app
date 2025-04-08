import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";

/**
 * @returns {JSX.Element}
 */
export default function Page() {
  try {
    const baseURLString = baseURL ? baseURL : "http://localhost:3000";

    return <section>
        <h2>About Our Company</h2>

        <Link href={baseURLString + "/about/gsn"}>About GSN</Link>
        <br />
        <Link href={baseURLString + "/about/gmp"}>About GMP</Link>
    </section>;
  } catch (error: any) {
    throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
  }
};
