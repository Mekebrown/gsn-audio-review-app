'use client';

import Image from "next/image";
import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";

// /delete-upload* - close icon, msg, confirm button, cancel link
export default function AllMediaPage() {
    const allMedia = [];

    return <section>
        <h1>
            <Link href={baseURL + "/media"}>MEDIA!!!</Link>
        </h1>

        <p>I want to show:</p><br />

        <hr />

        {allMedia.map(track => {
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
        })}
    </section>;
};
