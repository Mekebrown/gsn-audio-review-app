import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import testAudio from "../tools/envs";
import dataForProd from "../tools/dummy_data";

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
    const [playPauseBtnText, setPlayPauseBtnText] = useState("Play");
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(true);
    const [currentTimestamp, setCurrentTimestamp] = useState("0.00");
    const [mediaDesc, setMediaDesc] = useState("");
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
            } else  {
                playerRef.pause();
                setCurrentTimestamp(playerRef.currentTime.toFixed(2));
                setPlayPauseBtnText("Play");
            }
        }
    };

    const handleNoteSubmit = (event) => {
        event.preventDefault();

        const whatToSend = {
            is_note_updated: false,
            note_body: activeNoteInTextArea,
            note_timestamp: currentTimestamp,
            media_id: mediaId,
            user_id: 1, // eventually retrieved somewhere else
        }

        Axios.post("/usingle", whatToSend)
        .then((res) => res.status === 200 ? thankYouMsg.current.innerHTML = res.data.message : null)
        .catch(error => console.log(JSON.stringify(error)));

        setActiveNoteInTextArea("");

        setTimeout(() => thankYouMsg.current.innerHTML = "", 5000);
    };

    useEffect(() => { 
        // Axios.get("/usingle", {media_id: mediaId}).then((res) => {
        //     const {
        //         media_desc,
        //     } = res.media_desc;

        //     setMediaDesc(media_desc);
        // }).catch(error => console.log(error));

        setMediaDesc(dataForProd.media_desc);

        /* eslint-disable-next-line */
    }, [currentTimestamp]);

   return (
        <main> 
            <audio controls preload="auto" ref={player}>
                <source key="wearenotokay" src={testAudio} type="audio/mpeg" />
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>

            {mediaDesc && <p>Project description: <em>{mediaDesc}</em></p>}

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
                            value={activeNoteInTextArea}
                            onChange={(event)=>setActiveNoteInTextArea(event.target.value)}
                            onFocus={()=>setCurrentTimestamp(player.current.currentTime.toFixed(2))}
                            >
                        </textarea>

                        <br />

                        <input className="notePadSave" name="notePadSave" type="submit" value="Save" />
                    </form>
                </div>

                <p ref={thankYouMsg}></p>
            </section>
        </main>
    );
}; 

export default UserSingleProject;
