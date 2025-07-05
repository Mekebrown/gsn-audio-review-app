import { logoImage } from "@/app/lib/general_variables";

export default async function Page() {
    const allMedia = [
        {
            id: 1,
            thumbnail_file: logoImage,
        },
        {
            id: 2,
            thumbnail_file: logoImage,
        },
    ];

    return <section>
        Show the user's personal account info
    </section>;
};
