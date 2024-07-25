import { select_single_media } from "@/app/lib/fetch_statements";

/**
 * @description A Modal component showing a form to 
 * configure and send a new user their
 * account details
 * 
 * @param {Object} params
 * 
 * @returns {JSX.Element}
 */
export default async function Page({ params }) {
    const mediaId = params.id;

    const media_info = await select_single_media(mediaId);

    return <section>
        <h2>NEED PLAYER, NOTES FIELD, RATINGS FEATURES</h2>
        {mediaId}
        {media_info?.data !== null && 
            <article>
                {media_info}
            </article>
        }
    </section>;
};
