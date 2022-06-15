import React, { useEffect, useState } from "react";
import Axios from "axios";
import { REACT_APP_SERVER_URL, projectReviewingPath } from "../tools/envs";
import testAudio from "../tools/envs";
import { newSampleNote, updatedSampleNote } from "../tools/dummy_data";

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
    const [noteWithTimestamp, setNoteWithTimestamp] = useState("00.00.00");
    const [noteDetails, setNoteDetails] = useState([]); // Each note's contents, timestamp, id, and its link
    const [duration, setDuration] = useState(0);
    const [isAnUpdatedNote, setIsAnUpdatedNote] = useState(false);
    const [fileName, setFileName] = useState("");
    const [userId, setUserId] = useState(null);
    const [thumbRating, setThumbRating] = useState(false); // May not be set at all (not required in Ratings table)
    const [mediaDesc, setMediaDesc] = useState("");
    // const [projectName, setProjectName] = useState("Track Audio");
    // const [createdOn, setCreatedOn] = useState(null); // creation_datetime in db
    // const [currentTime, setCurrentTime] = useState(0);

    const theNotePadTextarea = document.querySelector(".notePadTextarea");
    const theFullNotePad = document.querySelector(".notePad");
    const thePlayer = document.querySelector(".audioPlayer");
    
    const loadNote = (e, noteInList) => {
        e.preventDefault();

        if (theNotePadTextarea && theFullNotePad) {
            let currentPlace = thePlayer?.current?.duration;
            
            if (currentPlace) {
                setDuration(Math.floor(currentPlace));
            }

            theFullNotePad.classList.remove("hideNotePad");

            setActiveNoteInTextArea(noteInList.nContents);

            if (noteInList.nTimestamp === currentPlace) {
                setIsAnUpdatedNote(true);
            }
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

    const onUpdateTimestampPoint = () => {
        let time = document.querySelector(".audioPlayer").currentTime;

        if (time?.toFixed(2) > 0) {
            setNoteWithTimestamp(`${time.toFixed(2)}`);
        }
    };

    const handleNotePadToggle = (userInfo = null) => {
        let createHideNoteBtn = document.querySelector(".createHide");
        // Eventually log that user thought about making a note...
        setHideNotePad(prev => !prev);

        hideNotePad ? createHideNoteBtn.innerHTML = "Hide Note" : createHideNoteBtn.innerHTML = "Create A Note";
    };

    const sources = [
        {item: 1, ext: "mp3", type: "audio/mpeg"}, 
        {item: 2, ext: "ogg", type: "audio/ogg"}
    ];

    const handleAudioControlsClick = (clickedBtn) => {
        if (clickedBtn === "reload") {
            thePlayer.currentTime = 0.0;
            thePlayer.pause();
        } else {
            if (thePlayer.currentTime === 0.0 || thePlayer.paused) {
                thePlayer.play(); 
                setPlayPauseBtnText("Pause");
            } else  {
                thePlayer.pause(); 
                setPlayPauseBtnText("Play");
            }
        }
    };

    const handleNoteSubmit = (event) => {
        event.preventDefault();

        let info = { note_body: event.value };

        isAnUpdatedNote ? info = {...info, updatedSampleNote} : info = {...info, newSampleNote};

        console.log(info);

        Axios.post('http://localhost:3001/usingle', info)
        .then((res) => console.log(JSON.stringify(res)))
        .catch(error => console.log(JSON.stringify(error)));

        setActiveNoteInTextArea("");

        document.getElementsByClassName("thankYouMsg").innerHTML = "Thanks for your contribution. You will be contacted right away!";
    };

    useEffect(() => {
        Axios.get(REACT_APP_SERVER_URL + projectReviewingPath + mediaId).then((initialInfo) => {
            if (initialInfo.status === 200) {
                const {
                    project_name, 
                    creation_datetime,
                    file_name,
                    user_id, 
                    media_desc,
                    thumb_rating,
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

                setNoteDetails(allNotesInfoForTrack);
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
            } //else {
            //     const formData = new FormData();
                
            //     formData.append('mediaId', mediaId);
            //     formData.append('res', initialInfo);

            //     Axios.post("http://localhost:3001/error", {
            //         method: 'POST',
            //         body: formData
            //     });
            // }
        });
        /* eslint-disable-next-line */
    }, []);

   return (
        <main>
            {thumbRating && (
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
            )}
            
            <audio controls className="audioPlayer" preload="auto">
                {
                    sources.map(source => {
                        return <source key={source.item} src={testAudio + source.ext} type={source.type} />
                    })
                }
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>

            <p>Project description: <em>{mediaDesc}</em></p>

            <div className="audioControls">
                <button className="playPause" onClick={() => {
                    handleAudioControlsClick("togglePlayPause")
                }}>{playPauseBtnText}</button>

                <button className="reload" onClick={() => {
                    handleAudioControlsClick("reload")
                }}>Reload</button>
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
                            placeholder="Notes:"
                            name="note"
                            maxLength="500"
                            value={activeNoteInTextArea}
                            onChange={(event)=>setActiveNoteInTextArea(event.target.value)}
                            onFocus={onUpdateTimestampPoint}
                            >
                        </textarea>

                        <br />

                        <input className="notePadSave" name="notePadSave" type="submit" value="Save" />
                    </form>
                </div>

                <p className="thankYouMsg"></p>
            </section>

            <div className="noteDetails">
                {noteDetails ? (
                    <>
                        <p>Most recent notes:</p>
                        <ul>
                            {
                                noteDetails.map((note) => {
                                    return <li key={note.nId} onClick={(e)=>loadNote(e, note)}>
                                        Note from timestamp {note.nTimestamp}: "<em>{note.nLink}</em>"
                                    </li>;
                                })
                            }
                        </ul>
                    </>
                ) : (
                    <span>No notes were saved for this audio</span>
                )}
            </div>
        </main>
    );
}; 

export default UserSingleProject;
