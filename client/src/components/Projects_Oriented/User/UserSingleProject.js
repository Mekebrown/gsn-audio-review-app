import React, { useEffect, useState } from "react";
import Axios from "axios";
import SectionAudioPlayerAndControls from "./Sections/SectionAudioPlayerAndControls";
import SectionNoteTaker from "./Sections/SectionNoteTaker";

/**
 * Page for a single media work and notes opportunity
 * 
 * @returns {Node} UserSingleProject
 */
const UserSingleProject = () => {
    const [mediaId, setMediaId] = useState(1); // media_id
    const [fileName, setFileName] = useState(""); // name in db
    const [userId, setUserId] = useState(1); // added_by in db
    const [projectName, setProjectName] = useState("");
    const [createdOn, setCreatedOn] = useState(""); // creation_datetime in db
    const [audioLength, setAudioLength] = useState(0); // time() data type?
    const [notesList, setNotesList] = useState([]);
    const [noteContent, setNoteContent] = useState(notesList ? notesList[0] : []);
    const [thumbRating, setThumbRating] = useState("");
    const [noteDetails, setNoteDetails] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);

    const noteCreationDateTime = new Date();

    const addNote = () => {
        Axios.post("http://localhost:3001/create", {
            projectName: projectName,
            fileName: fileName,
            creationDateTime: noteCreationDateTime,
            notesList: notesList,
            noteContent: noteContent,
            userId: userId,
            thumbRating: thumbRating,
          }).then((res) => {
            if (res.ok) {
                setNoteDetails([
                    ...notesList,
                    {
                        projectName: projectName,
                        fileName: fileName,
                        creationDateTime: noteCreationDateTime,
                        noteContent: noteContent,
                        userId: userId,
                        thumbRating: thumbRating,
                    },
                ]);
                
                setMediaId(res.media_id);
                setFileName(res.name);
                setUserId(res.added_by);
                setProjectName(res.project_name);
                setCreatedOn(res.creation_datetime);
                setAudioLength(fileName.length); // find audio length
                setNotesList(["1. First Note", "2. Second Note", "3. Third Note"]);
                setNoteContent(res.userSingleProject);
                setThumbRating(res.userSingleProject.previousRating);
            } else console.log("Error");
          });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/usingle", { media_id: mediaId }).then((res) => {
            if (res.ok) {
                // Retrieve path + file name; Save to fileName
                let info = res.data;

                setFileName(info.location + info.name);
                setThumbRating("up");//info.thumb_rating);
                setPlayerDetails([fileName, thumbRating]);
                setNoteDetails([info]);

                console.log(JSON.stringify(res));
            } else {
                console.log("Sorry, didn't work");
            }
        });
    }, [setFileName, setThumbRating, setPlayerDetails, setNoteDetails, fileName, thumbRating, mediaId]);

   return (
        <div>
            <header>
                <h2>{projectName}</h2>
            </header>

            <main>
                <ul>
                    <li>File name: {fileName}</li>
                    <li>Length: {audioLength}</li>
                    <li>Total notes: {notesList.length}</li>
                    <li>Created: {createdOn}</li>
                </ul>
                
                <hr />

                <SectionAudioPlayerAndControls playerDetails={playerDetails} />

                <SectionNoteTaker noteDetails={noteDetails} submitFn={addNote} />

                <section id="notesList">   
                    <ul></ul>
                    <section id="done" hidden>
                        <p>Thanks for your contribution. You will be contacted right away!</p>
                    </section>
                </section>
            </main>
        </div>
    )
}; 

export default UserSingleProject;
