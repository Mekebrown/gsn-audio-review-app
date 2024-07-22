const getNoteInfo = async (id) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const queryString = "?request_type=single&note_id=" + id;

    const note = await fetch(apiURL + '/portal/notes').then((res) => res.json());
    const { data } = note;

    return data;
};

/**
 * @description A component showing a note 
 * to an admin in a modal
 * 
 * Admin-only; TODO: Show in a modal
 * 
 * @param {Object} params
 * 
 * @returns {React.ReactElement}
 */
export default async function Page({ params }) {
    const noteId = params.id;
    const note_info = await getNoteInfo(noteId);

    return <section>
        <h2>Note #{noteId}</h2>
    </section>;
};
