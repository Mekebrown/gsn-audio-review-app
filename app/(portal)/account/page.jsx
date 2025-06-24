import Image from "next/image";
import Link from 'next/link';

import { baseURL, logoImage } from "@/app/lib/general_variables";

export default async function Page() {
    const allMedia = [
        {
            id: 1,
            thumbURL: logoImage,
        },
        {
            id: 2,
            thumbURL: logoImage,
        },
    ];

    return <section>
        Show the user's personal account info
    </section>;
};
