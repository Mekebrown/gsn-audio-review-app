import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import AudioPlayerAndControls from "./Sections/AudioPlayerAndControls";
import NoteTaker from "./Sections/NoteTaker";
import PreviousNotesLinks from "./Sections/PreviousNotesLinks";
import testAudio, {REACT_APP_SERVER_URL, projectReviewingPath} from "../../data/envs";

/**
 * Page for a single media work and notes opportunity
 * 
 * @returns {Node} UserSingleProject
 */
const UserSingleProject = ({introUserId}) => {
    const [fileName, setFileName] = useState(""); // name in db
    const [userId, setUserId] = useState(introUserId ? introUserId : 1); // added_by in db
    const [projectName, setProjectName] = useState("Track Audio");
    const [createdOn, setCreatedOn] = useState("January 25th, 2022"); // creation_datetime in db
    const [audioLength, setAudioLength] = useState(0); // time() data type?
    const [notesList, setNotesList] = useState([]);
    const [thumbRating, setThumbRating] = useState("");
    const [noteDetails, setNoteDetails] = useState({});
    const [playerDetails, setPlayerDetails] = useState([]);
    const [mediaId, setMediaId] = useState(1);
    var info = useRef({});

    // Need to retrieve current user and all of *their* notes
    useEffect(() => {
        Axios.get(REACT_APP_SERVER_URL + projectReviewingPath + mediaId).then((res) => {
            if (res.status === 200) {
  
//                 // Retrieve path + file name; Save to fileName
                info = res.data;

//                 setUserId(info.user_id);
//                 console.log("mn"+userId);
// //                 setProjectName(info.project_name);
// //                 setFileName(info.directory + info.file_name);
                 setThumbRating("up");//info.thumb_rating);
                setPlayerDetails([testAudio, thumbRating]);
                setNotesList(info.contents); // Contents of notes for this media 
                 setAudioLength("00:" + fileName.length + "1:00");
                 setNoteDetails({...noteDetails, projectName: projectName});
//             } else {
//                 const formData = new FormData();
                
//                 formData.append('mediaId', mediaId);
//                 formData.append('res', res);

//                 Axios.post("http://localhost:3001/error", {
//                     method: 'POST',
//                     body: formData
//                 });

//                 console.log("Sorry, didn't work");
            }
         });
    }, [info]);

   return (
        <div>
            <header>
                <h2>
                    <p>Project: <em>{projectName}</em>, created on {createdOn}</p>
                </h2>
            </header>
                
            <main>
                <hr />

                <AudioPlayerAndControls playerDetails={playerDetails} />

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
