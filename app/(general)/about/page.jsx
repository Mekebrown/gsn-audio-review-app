import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";

export default function Page() {
    return <section>
        <h2>About Our Company</h2>

        <Link href={baseURL + "/about/gsn"}>About GSN</Link>
        <Link href={baseURL + "/about/gmp"}>About GMP</Link>
    </section>;
};
