const getMediaInfo = async (id) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const queryString = "?request_type=single&media_id=" + id;

    const media = await fetch(apiURL + '/portal/media' + queryString).then((res) => res.json());
    const { data } = media;

    return data;
};

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

    const media_info = await getMediaInfo(mediaId);

    return <section>
        <h2>NEED PLAYER, NOTES FIELD, RATINGS FEATURES</h2>
        {mediaId}
        <article>
            {media_info}
        </article>
    </section>;
};
