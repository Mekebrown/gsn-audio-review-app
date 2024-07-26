'use client';

import Image from "next/image";
import Link from 'next/link';

import { GeneralToast } from "@/app/ui/Toast";
import { baseURL, logoImage } from "@/app/lib/general_variables";

export default function Page() {
    const { data: session, status } = { data: "user", status: "authenticated" }; //useSession();

    const loading = status === "loading";
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

    if (status === "unauthenticated") {
        window.location.href = baseURL;
        return null;
    } else if (loading) {
        return "Loading or not authenticated..."
    }

    return <section>
        <GeneralToast message={session} />
        <h1>
            <Link href={baseURL + "/media"}>MEDIA!!!</Link>
        </h1>

        <p>I want to show:</p><br />

        <hr />

        {
            allMedia.length > 0 ? (
                allMedia.map(track => {
                    return <div key={track.id}>
                        <div style={{ display: "flex" }}>
                            <div style={{ flexGrow: 1 }}>
                                &#x23EF;
                            </div>
                            &nbsp;
                            <div style={{ flexGrow: 1 }}>
                                <strong>+</strong>
                            </div>
                            &nbsp;
                            <div style={{ flexGrow: 2 }}>
                                <Image
                                    alt=""
                                    src={track.thumbURL}
                                    width="50"
                                    height="50"
                                />
                            </div>

                            <div style={{ flexGrow: 4 }}>
                                <p>
                                    Media project #{track.id}
                                </p>
                                <p>
                                    A player with preloaded audio of each media item
                                </p>
                                <p>
                                    A preview of the latest note added to each media...
                                </p>
                                <p>
                                    Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users
                                </p>
                            </div>

                            <span style={{ flexGrow: 1 }}>4:05 mins</span>

                            <button style={{ flexGrow: 2 }}>Make A Note</button>
                            <button type="reset">Clear All</button>
                        </div>

                        <hr />
                    </div>;
                })) : (
                <p>"No media to show"</p>
            )
        }
    </section>;
};
