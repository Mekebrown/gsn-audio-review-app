import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserLogin";
import Home from "../Home";
import AudioTrack from "../tools/AudioTrack";
import { v4 as uuidv4 } from 'uuid';

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
const UserSingleProject = ({ mediaId }) => {
    const [fileLocAndName, setFileLocAndName] = useState();
    const [testAudio, setTestAudio] = useState(null);
    const [playPauseBtnText, setPlayPauseBtnText] = useState("Play");
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(true);
    const [currentTimestamp, setCurrentTimestamp] = useState("0.00");
    const [mediaDesc, setMediaDesc] = useState(null);
    const [projectName, setProjectName] = useState(null);
    const [noteId, setNoteId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const player = useRef(null);
    const thankYouMsg = useRef(null);
    const fileTypes = [["mp3", "mpeg"], ["wav", "wav"]];

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
                    console.log(JSON.stringify(error));
                });

            setActiveNoteInTextArea("");

            setTimeout(() => thankYouMsg.current.innerHTML = "", 5000);
        } else {
            thankYouMsg.current.innerHTML = "Sorry, the note was not saved. Please try again.";
        }
    };

    const { userId } = useContext(UserContext);

    const getAudioTracks = (fileLocAndFileName) => {
        const trackCollection = [];

        const MP3 = "audio/mpeg";
        const OGG = "audio/ogg";
        const fileMP3 = `${fileLocAndFileName}.mp3`;
        const fileOGG = `${fileLocAndFileName}.ogg`;

        trackCollection.push(new AudioTrack(fileMP3, MP3));
        trackCollection.push(new AudioTrack(fileOGG, OGG));

        return trackCollection;
    };

    useEffect(() => {
        // let userIdFromLocalStorage = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;

        // if (!userIdFromLocalStorage && window.location.href.split("uid=")[1]) {
        //     window.localStorage.setItem('userId', window.location.href.split("uid=")[1]);
        //     setIsLoggedIn(true);
        // }

        // let collectedCookies = document.cookie.split(';');

        // collectedCookies.forEach((item) => {
        //     let cookieInfo = item.split("=");

        //     if (cookieInfo[0] === "reviewPortal") {
        //         setLoggedIn(true);

        //     }
        // });

        axios.get(`/api/media/${mediaId}`)
            .then((res) => {
                if (res.status === 200) {
                    const {
                        media_desc,
                        note_id,
                        file_name,
                        file_directory,
                        project_name,
                        totalNotesFromServer
                    } = res.data;

                    setMediaDesc(media_desc);
                    setNoteId(note_id);
                    // setTestAudio(file_directory + file_name);
                    setTestAudio("https://ia804601.us.archive.org/22/items/hpr0283/hpr0283.mp3");
                    setProjectName(project_name);
                }
            })
            .catch(error => console.log(error));

        /* eslint-disable-next-line */
    }, [currentTimestamp]);

    return (<>
        {userId ? <section>
            <audio controls preload="auto" ref={player}>
                {
                    getAudioTracks(fileLocAndName).map((track) => {
                        return <source key={uuidv4()} src={track.file} type={track.fileType} />;
                    })
                }
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>

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
        </section> : <Home />}
    </>);
};

export default UserSingleProject;
