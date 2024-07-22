import Link from "next/link";

export default function Page() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    return <section>
        <h2>About Our Company</h2>

        <Link href={baseURL + "/about/gsn"}>About GSN</Link>
        <Link href={baseURL + "/about/gmp"}>About GMP</Link>
    </section>;
};
