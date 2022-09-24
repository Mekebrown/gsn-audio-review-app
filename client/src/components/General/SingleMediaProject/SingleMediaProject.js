import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import AudioTrack from "../../tools/audio_track_constructor";

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
 * @returns {Node} SingleMediaProject
 */
const SingleMediaProject = ({ mediaId }) => {
    const [fileLocAndName, setFileLocAndName] = useState(null);
    const [notes, setNotes] = useState([]);
    const [playPauseBtnText, setPlayPauseBtnText] = useState("Play");
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(true);
    const [currentTimestamp, setCurrentTimestamp] = useState("0.00");
    const [mediaDesc, setMediaDesc] = useState(null);
    const [projectName, setProjectName] = useState(null);
    const [noteId, setNoteId] = useState(null);

    const player = useRef(null);
    const thankYouMsg = useRef(null);

    const handleNotePadToggle = (userInfo = null) => {
        let timeStampForNote = userInfo?.nTimestamp ? userInfo.nTimestamp : player.current.currentTime;

        setCurrentTimestamp(parseFloat(timeStampForNote).toFixed(2));

        let createHideNoteBtn = document.querySelector(".createHide");

        // Eventually log that the user thought about making a note...
        setHideNotePad(prev => !prev);

        hideNotePad ? createHideNoteBtn.innerHTML = "Hide Note" : createHideNoteBtn.innerHTML = "Create A Note";
    };

    const handleAudioControlsClick = (clickedBtn) => {
        const playerRef = player.current;

        if (clickedBtn === "reload") {
            player.current.pause();
            player.current.currentTime = 0.0;
            setCurrentTimestamp("0.00");
        } else {
            if (playerRef.currentTime === 0 || playerRef.paused) {
                playerRef.play();
                setPlayPauseBtnText("Pause");
            } else {
                playerRef.pause();
                setCurrentTimestamp(playerRef.currentTime.toFixed(2));
                setPlayPauseBtnText("Play");
            }
        }
    };

    const handleNoteSubmit = (event) => {
        event.preventDefault();

        if (activeNoteInTextArea !== undefined
            && activeNoteInTextArea !== 0
            && activeNoteInTextArea !== null
            && activeNoteInTextArea !== "") {
            const whatToSend = {
                is_note_updated: false,
                note_body: activeNoteInTextArea,
                note_timestamp: currentTimestamp,
                media_id: mediaId,
                note_id: noteId,
                user_id: 1, // eventually retrieved somewhere else
            };

            axios.post("/api/new/note", whatToSend)
                .then((res) => res.status === 200 ? thankYouMsg.current.innerHTML = res.data.message : null)
                .catch(error => {
                    thankYouMsg.current.innerHTML = "Sorry, the note was not saved. Please try again.";
                    console.log(error);
                });

            setActiveNoteInTextArea("");

            setTimeout(() => thankYouMsg.current.innerHTML = "", 5000);
        } else {
            thankYouMsg.current.innerHTML = "Sorry, the note was not saved. Please try again.";
        }
    };

    const AudioTracks = () => {
        return <audio controls preload="auto" ref={player}>
            <source src={`${fileLocAndName}.mp3`} type="audio/mpeg" />
            <source src={`${fileLocAndName}.ogg`} type="audio/ogg" />

            Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
        </audio>;
    };

    useEffect(() => {
        axios.get(`/api/media/${mediaId}`)
            .then((res) => {
                if (res.status === 200) {
                    const {
                        file_directory,
                        file_name,
                        media_desc,
                        project_name,
                        notes
                    } = res.data.media_info;

                    setFileLocAndName(file_directory + file_name);
                    setMediaDesc(media_desc);
                    setProjectName(project_name);
                    setNotes(notes);
                }
            })
            .catch(error => console.log(error));

        /* eslint-disable-next-line */
    }, [fileLocAndName]);

    return (<> <section>
        <AudioTracks />

        {projectName && <p>Project: {projectName}</p>}
        {mediaDesc && <p>About this project: <em>{mediaDesc}</em></p>}

        <div className="audioControls">
            <button className="playPause" onClick={() => handleAudioControlsClick("togglePlayPause")}>{playPauseBtnText}</button>

            <button className="reload" onClick={() => handleAudioControlsClick("reload")}>Reload</button>
        </div>

        <section className="notesContainer">
            <button className="createHide" onClick={handleNotePadToggle}>Create A Note</button>

            <div className={hideNotePad ? "notePad hideNotePad" : "notePad"}>

                <hr />

                <form className="hereThere" onSubmit={handleNoteSubmit}>
                    <textarea className="notePadTextarea"
                        rows="10"
                        cols="50"
                        title="Note pad text area"
                        placeholder={"Note for " + currentTimestamp + ":"}
                        name="note"
                        maxLength="500"
                        required
                        value={activeNoteInTextArea}
                        onChange={(event) => setActiveNoteInTextArea(event.target.value)}
                        onFocus={() => setCurrentTimestamp(player.current.currentTime.toFixed(2))}
                    >
                    </textarea>

                    <br />

                    <input className="notePadSave" name="notePadSave" type="submit" value="Save" />
                </form>
            </div>

            <p ref={thankYouMsg}></p>
        </section>
    </section>
    </>);
};

export default SingleMediaProject;
