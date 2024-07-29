import axios from "axios";

import { getSingleNoteAPIPath } from "@/app/lib/general_variables";

const getNoteInfo = async (id) => {
    const note = await axios(getSingleNoteAPIPath + id).then((res) => res.json());
    const resJSON = await note.json();
    const { data } = resJSON;

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
    const resJSON = await note_info.json();
    const { data } = resJSON;

    return <section>
        <h2>Note #{noteId}</h2>
        {data}
    </section>;
};
