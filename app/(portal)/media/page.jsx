import Image from "next/image";
import Link from "next/link";

import { baseURL } from "@/app/lib/general_variables";
import { allMedia as allMediaFunc } from "@/app/lib/media_placeholders";

// /delete-upload* - close icon, msg, confirm button, cancel link
export default async function Page() {
    const allMedia = await allMediaFunc();

    return <section>
        <h1>
            <Link href={baseURL + "/media"}>MEDIA!!!</Link>
        </h1>

        <p>I want to show:</p><br />

        <hr />

        {allMedia.map(media => {
            return <div key={media.id}>
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
                            src={"http://localhost:1337" + media.thumbnail.url}
                            width="50"
                            height="50"
                        />
                    </div>

                    <div style={{ flexGrow: 4 }}>
                        <p>
                            <Link href={baseURL + "/media/" + media.id}>Media project #{media.id}</Link>
                        </p>
                        <p>
                            A player with preloaded audio of each media item
                        </p>
                        <p>
                            <Link href={baseURL + "/media/" + media.id}>A preview of the latest note added to each media...</Link>
                        </p>
                        <p>
                            Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users
                        </p>
                    </div>

                    <span style={{ flexGrow: 1 }}>Timestamp: 04:05</span>
                </div>

                <hr />
            </div>;
        })}
    </section>;
};
