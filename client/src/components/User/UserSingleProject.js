import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import testAudio from "../tools/envs";
import dataForProd, { newSampleNote, updatedSampleNote } from "../tools/dummy_data";

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
    const [noteWithTimestamp, setNoteWithTimestamp] = useState("0.00");
    const [notesList, setNotesList] = useState(null); // Each note's contents, timestamp, id, and its link
    const [isAnUpdatedNote, setIsAnUpdatedNote] = useState(false);
    const [thumbRating, setThumbRating] = useState(false); // May not be set at all (not required in Ratings table)
    const [mediaDesc, setMediaDesc] = useState("");
    const theNotePadTextarea = document.querySelector(".notePadTextarea");
    const theFullNotePad = document.querySelector(".notePad");
    const player = useRef(null);
    const thankYouMsg = useRef(null);

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
    
    const handleNotePadToggle = (userInfo = null) => {
        let timeStampForNote = userInfo?.nTimestamp ? userInfo.nTimestamp : player.current.currentTime;

        setNoteWithTimestamp(parseFloat(timeStampForNote).toFixed(2));

        let createHideNoteBtn = document.querySelector(".createHide");

        // Eventually log that the user thought about making a note...
        setHideNotePad(prev => !prev);

        hideNotePad ? createHideNoteBtn.innerHTML = "Hide Note" : createHideNoteBtn.innerHTML = "Create A Note";
    };

    const loadNote = (e, noteInList) => {
        e.preventDefault();

        if (theNotePadTextarea && theFullNotePad) {
            handleNotePadToggle(noteInList);

            setActiveNoteInTextArea(noteInList.nContents);

            setIsAnUpdatedNote(true);
        }

        console.log("From loadNote, the timestamp set is ", noteWithTimestamp);
    };

    const handleAudioControlsClick = (clickedBtn) => {
        const playerRef = player.current;

        if (clickedBtn === "reload") {
            player.current.pause();
            player.current.currentTime = 0.0;
            setNoteWithTimestamp("0.00");
        } else {
            if (playerRef.currentTime === 0 || playerRef.paused) {
                playerRef.play(); 
                setPlayPauseBtnText("Pause");
            } else  {
                playerRef.pause();
                setNoteWithTimestamp(playerRef.currentTime.toFixed(2));
                setPlayPauseBtnText("Play");
            }
        }
    };

    const handleNoteSubmit = (event) => {
        const thankYouMsgRef = thankYouMsg.current;

        event.preventDefault();

        let info = { note_body: event.target.textContent };

        isAnUpdatedNote ? info = {...info, updatedSampleNote} : info = {...info, newSampleNote};

        Axios.post("/", info)
        .then((res) => console.log(JSON.stringify(res)))
        .catch(error => console.log(JSON.stringify(error)));

        setActiveNoteInTextArea("");

        thankYouMsgRef.innerHTML = "Thanks for your contribution. You will be contacted right away!";
    };

    useEffect(() => {
        // Axios.get("http://localhost:3001/usingle/" + mediaId).then((initialInfo) => {
            // if (initialInfo.status === 200) {
                const {
                    project_name, 
                    creation_datetime,
                    file_name,
                    user_id, 
                    media_desc,
                    thumb_rating,
                    totalNotesFromServer
                } = dataForProd;

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

                setNotesList(allNotesInfoForTrack);
                setThumbRating(thumb_rating ? thumb_rating : false);

                setMediaDesc(media_desc);
                // setFileName(file_name);
                // setUserId(user_id);

                // const creationDate = new Date(creation_datetime);
                // const cMonth = creationDate.getMonth() + 1;
                // const cDay = creationDate.getDate();
                // const cYear = creationDate.getFullYear();
                // const formattedMediaDate = cMonth + "/" + cDay + "/" + cYear;
                // const formattedProjectName = project_name[0].toUpperCase() + project_name.substring(1);

                // setProjectName(formattedProjectName);
                // setCreatedOn(formattedMediaDate);
            // } else {
            //     const formData = new FormData();
                
            //     formData.append('mediaId', mediaId);
            //     formData.append('res', initialInfo);

            //     Axios.post("http://localhost:3001/error", {
            //         method: 'POST',
            //         body: formData
            //     });
            // }
        // });

        /* eslint-disable-next-line */
    }, [noteWithTimestamp]);

   return (
        <main>
            {thumbRating && 
                <div>
                    <button
                        value="approve" 
                        className="trackApproved" 
                        onClick={() => setThumbRating("up")}
                    >
                        &#128077;
                    </button>
                    &nbsp;
                    <button 
                        value="disapprove" 
                        className="trackDisapproved" 
                        onClick={() => setThumbRating("down")}
                    >
                        &#128078;
                    </button>
                </div>
            }
            
            <audio controls preload="auto" ref={player}>
                {/* {
                    sources.map(source => {
                        return <source key={source.item} src={testAudio + source.ext} type={source.type} />
                    })
                } */}
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
                            placeholder={"Note for " + noteWithTimestamp + ":"}
                            name="note"
                            maxLength="500"
                            value={activeNoteInTextArea}
                            onChange={(event)=>setActiveNoteInTextArea(event.target.value)}
                            onFocus={()=>setNoteWithTimestamp(player.current.currentTime.toFixed(2))}
                            >
                        </textarea>

                        <br />

                        <input className="notePadSave" name="notePadSave" type="submit" value="Save" />
                    </form>
                </div>

                <p ref={thankYouMsg}></p>
            </section>

            <div className="notesList">
                {notesList ? (
                    <>
                        <p>Most recent notes:</p>
                        <ul>
                            {notesList.map((note) => {
                                return <li key={note.nId} onClick={(e)=>loadNote(e, note)}>
                                    Note from timestamp {note.nTimestamp}: "<em>{note.nLink}</em>"
                                </li>;
                            })}
                        </ul>
                    </>
                ) : <span>No notes yet</span>}
            </div>
        </main>
    );
}; 

export default UserSingleProject;
