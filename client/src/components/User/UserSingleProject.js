import React, { useEffect, useState } from "react";
import Axios from "axios";
import AudioPlayerAndControls from "./Sections/AudioPlayerAndControls";
import { REACT_APP_SERVER_URL, projectReviewingPath } from "../tools/envs";
// import NoteTaker from "./Sections/NoteTaker";

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
 * @param {Number} mediaId
 * 
 * @returns {Node} UserSingleProject
 */
const UserSingleProject = ({mediaId}) => {
    const [fileName, setFileName] = useState("");
    const [userId, setUserId] = useState(null);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [thumbRating, setThumbRating] = useState(false); // May not be set at all (not required in Ratings table)
    const [mediaDesc, setMediaDesc] = useState("");
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(false);
    const [hideTimestampText, setHideTimestampText] = useState(true);
    const [noteWithTimestamp, setNoteWithTimestamp] = useState("note_00.00.00");
    const [isAnUpdatedNote, setIsAnUpdatedNote] = useState(false);
    const theNotePadTextarea = document.querySelector(".notePadTextarea");
    const theFullNotePad = document.querySelector(".notePad");
    const timestampDiv = document.querySelector(".timestampDiv");
    // const [projectName, setProjectName] = useState("Track Audio");
    // const [createdOn, setCreatedOn] = useState(null); // creation_datetime in db
    // const [noteDetails, setNoteDetails] = useState([]);
    // const [currentTime, setCurrentTime] = useState(0);

    const noteAreaSelectionToggle = (e) => {
        e.preventDefault();

        // When user clicks in text box, pause player, record current timestamp, update timestampDiv with current timestamp messaging
                                    
        console.log("hit");
    }

    const loadNote = (e, nContents, nTimestamp, nId) => {
        e.preventDefault();

        if (theNotePadTextarea && timestampDiv) { // If notepad's present
            theFullNotePad.removeAttribute("class"); // Make sure it's visible now
            timestampDiv.removeAttribute("class"); // Make sure it's visible now

            let timestamp = (nTimestamp).split("note_")[1];

            timestampDiv.innerHTML = "<small><em>From timestamp " + timestamp + ": </em></small>";
            setActiveNoteInTextArea(nContents);
            setCurrentNoteId(nId);
            setIsAnUpdatedNote(true);
            
        }
    };

    const getListLinkForNote = (noteToProcess) => {
        let toShow = noteToProcess ? noteToProcess : activeNoteInTextArea;
        let aLen = toShow.length;
        let aSplit = toShow.split(" ");

        if (aLen > 10) {
            let cNV = aSplit;

            toShow = cNV.length < 3 ? 
                        toShow : 
                            cNV[0].length < 5 && cNV[1].length < 5 && cNV[2].length < 5 ? 
                                cNV[0] + " " + cNV[1] + " " + cNV[2] + " ..." : 
                                    cNV[0].length < 5 && cNV[1].length < 5 ? 
                                        cNV[0] + " " + cNV[1] + " ..."  : cNV[0] + " ...";   
        }

        return toShow;
    };

    // const handleSizeChange = (change) => {};

    const onUpdateTimestampPoint = () => {
        let time = document.querySelector(".audioPlayer").currentTime;

        if (time?.toFixed(2) > 0) {
            setNoteWithTimestamp(`note_${time.toFixed(2)}`);
        }
    };

    const handleNotePadToggle = (event) => {
        event.preventDefault(); 

        setHideNotePad(prev => !prev);
    };

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        timestampDiv.removeAttribute("class"); // Make sure it's visible now
        setHideTimestampText(false);

        const info = {
            media_id: 1,
            note_body: event.value, // note_last_updated: isAnUpdatedNote ? new Date() : false,
            note_id: 11111,
            note_timestamp: noteWithTimestamp,
            current_datetime: event.timeStamp
        };

        Axios.post('http://localhost:3001/usingle', info)
        .then((res) => timestampDiv.innerHTML = "<small><em>" + JSON.stringify(res) + "</em></small>") // Handle updating noteDetails with res info
        .catch(error => timestampDiv.innerHTML = "<small><em>" + JSON.stringify(error) + "</em></small>");

        // setHideTimestampText(true);
        // setActiveNoteInTextArea("");
    };

    // Need to retrieve current user and all of *their* notes
    useEffect(() => {
        Axios.get(REACT_APP_SERVER_URL + projectReviewingPath + mediaId).then((initialInfo) => {
            if (initialInfo.status === 200) {
                const {
                    project_name, 
                    creation_datetime,
                    file_name,
                    thumb_rating, 
                    media_desc,
                    user_id,
                    totalNotesFromServer
                } = initialInfo.data;

                let allNotesInfoForTrack = [];

                for (let eachNote of totalNotesFromServer) {
                    let nContents = eachNote.note_body;

                    allNotesInfoForTrack = [
                        ...allNotesInfoForTrack,
                        {
                            nContents: nContents,
                            nTimestamp: eachNote.note_timestamp,
                            nId: eachNote.note_id,
                            nLink: getListLinkForNote(nContents)
                        }
                    ];
                }

                // setNoteDetails(allNotesInfoForTrack);
                
                // const creationDate = new Date(creation_datetime);
                // const cMonth = creationDate.getMonth() + 1;
                // const cDay = creationDate.getDate();
                // const cYear = creationDate.getFullYear();
                // const formattedMediaDate = cMonth + "/" + cDay + "/" + cYear;
                // const formattedProjectName = project_name[0].toUpperCase() + project_name.substring(1);

                // setProjectName(formattedProjectName);
                setMediaDesc(media_desc);
                setFileName(file_name);
                setUserId(user_id);
                // setCreatedOn(formattedMediaDate);
                setThumbRating(thumb_rating ? thumb_rating : false);


                if (isAnUpdatedNote === "This ain't gonna happen") { // Delete
                    loadNote(); // Delete
                    handleNotePadToggle(project_name + creation_datetime); // Delete
                } // Delete
            } else {
                const formData = new FormData();
                
                formData.append('mediaId', mediaId);
                formData.append('res', initialInfo);

                Axios.post("http://localhost:3001/error", {
                    method: 'POST',
                    body: formData
                });
            }
        });
        /* eslint-disable-next-line */
    }, []);

   return (
        <div>
            <AudioPlayerAndControls fileName={fileName} thumbRating={thumbRating} mediaDesc={mediaDesc} mediaId={mediaId} userId={userId} />
                
            <hr />

            <main>
                <section className="notesContainer" draggable="true">

                    <div className={hideNotePad ? "notePad hideNotePad" : "notePad"}>
                        <form className="hereThere" onSubmit={handleNoteSubmit}>
                            <input className="notePadSave" name="notePadSave" type="submit" value="Save" />

                            <div className={hideTimestampText ? "hideTimestampText timestampDiv" : "timestampDiv"} />

                            <textarea className="notePadTextarea" 
                                rows="10" 
                                cols="50" 
                                title="Note pad text area" 
                                placeholder="Notes:"
                                name="note"
                                maxLength="500"
                                value={activeNoteInTextArea}
                                onChange={(event)=>setActiveNoteInTextArea(event.target.value)}
                                onFocus={onUpdateTimestampPoint}
                                onClick={(e) => {noteAreaSelectionToggle(e)}}
                                >
                            </textarea>
                        </form>
                    </div>
                </section>

                <section className="done" hidden>
                    <p>Thanks for your contribution. You will be contacted right away!</p>
                </section>
            </main>
        </div>
    );
}; 

export default UserSingleProject;
