import React, { useEffect, useState } from "react";
import Axios from "axios";
import AudioPlayerAndControls from "./Sections/AudioPlayerAndControls";
import NoteTaker from "./Sections/NoteTaker";
import PreviousNotesLinks from "./Sections/PreviousNotesLinks";
import testAudio, {REACT_APP_SERVER_URL, projectReviewingPath} from "../tools/envs";

/**
 * Page for a single media work and notes opportunity
 * 
 * GET info retrieved: 
 * - User id 
 * - Media id for this project
 * - Project name
 * - Media file name and directory to load media
 * - Previous thumbnail rating, if set
 * - List of notes the current user saved for this work, if set (all_note_ids)
 * 
 * @returns {Node} UserSingleProject
 */
const UserSingleProject = ({mediaId}) => {
    const [fileName, setFileName] = useState("");
    const [userId, setUserId] = useState(1); // added_by in db
    const [projectName, setProjectName] = useState("Track Audio");
    const [createdOn, setCreatedOn] = useState(null); // creation_datetime in db
    const [notesList, setNotesList] = useState([]);
    const [thumbRating, setThumbRating] = useState("");
    const [mediaDesc, setMediaDesc] = useState("");
    const [noteDetails, setNoteDetails] = useState({});

    // Need to retrieve current user and all of *their* notes
    useEffect(() => {
        Axios.get(REACT_APP_SERVER_URL + projectReviewingPath + mediaId).then((res) => {
            if (res.status === 200) {
                const {
                    project_name, file_name, creation_datetime, user_id,
                    thumb_rating, media_desc, contents
                } = res.data;
                
                const creationDate = new Date(creation_datetime);
                const cMonth = creationDate.getMonth() + 1;
                const cDay = creationDate.getDate();
                const cYear = creationDate.getFullYear();
                const formattedMediaDate = cMonth + "/" + cDay + "/" + cYear;
                const formattedProjectName = project_name[0].toUpperCase() + project_name.substring(1);

                setUserId(user_id);
                setProjectName(formattedProjectName);
                setMediaDesc(media_desc);
                setFileName(file_name);
                setCreatedOn(formattedMediaDate);
                setThumbRating(thumb_rating);
                setNotesList(contents); // Contents of notes for this media
                setNoteDetails({...noteDetails, userId: userId, mediaId: mediaId});
            } else {
                const formData = new FormData();
                
                formData.append('mediaId', mediaId);
                formData.append('res', res);

                Axios.post("http://localhost:3001/error", {
                    method: 'POST',
                    body: formData
                });
            }
         });
    }, []);

   return (
        <div>
            <header>
                <h2>
                    <p>Project: <em>{projectName}</em>, created on {createdOn}</p>
                </h2>
            </header>
                
            <main>
                <hr />

                <AudioPlayerAndControls playerDetails={[fileName, thumbRating, mediaId, mediaDesc, userId]} />

                <NoteTaker noteDetails={noteDetails} />

                <PreviousNotesLinks notesList={notesList} />

                <section id="done" hidden>
                    <p>Thanks for your contribution. You will be contacted right away!</p>
                </section>
            </main>
        </div>
    )
}; 

export default UserSingleProject;
