import React, { useState } from "react";
import Axios from "axios";

/**
 * Note creator
 * 
 * POST info sent (thumbnail rating):
 * - User id
 * - Date and time (creation and read the same)
 * - Media id
 * - Thumbnail rating
 * 
 * POST info sent (note submission):
 * - User id
 * - Media id
 * - Date and time (creation and read the same)
 * 
 * @param {Object} noteDetails
 * 
 * @returns {Node} NoteTaker
 */
const NoteTaker = ({noteDetails, notesList}) => {
    const { userId, mediaId } = noteDetails;

    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("Homie");
    const [hideNotePad, setHideNotePad] = useState(false);
    const [currentNotesList, setCurrentNotesList] = useState(notesList);
    const [noteWithTimestamp, setNoteWithTimestamp] = useState("note_");
    const [isAnUpdatedNote, setIsAnUpdatedNote] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [serverData, setServerData] = useState({});

    const theNotePadTextarea = document.querySelector(".notePadTextarea");
    const theFullNotePad = document.querySelector(".notePad");
    const thePlayer = document.querySelector(".audioPlayer");
    
    const loadNote = (e, noteInList) => {
        e.preventDefault();

        if (theNotePadTextarea) {
            theFullNotePad.removeAttribute("class");
            theNotePadTextarea.value = noteInList;
            setIsAnUpdatedNote("true");
        }
    };

    const handleSizeChange = (change) => {};

    const updateNotesList = () => {
        let toShow = activeNoteInTextArea;

        if (activeNoteInTextArea.length > 10) {
            let cNV = activeNoteInTextArea.split(" ");

            toShow = cNV.length > 3 ? cNV[0] + " " + cNV[1] + " " + cNV[2] + " ..." : toShow;
        }

        setCurrentNotesList(currentNotesList => {
            return [toShow, ...currentNotesList]
        });
    };

    const updateDuration = () => {
        const timerz = thePlayer?.current?.duration ? thePlayer.current.duration : "undefined";
        setNoteWithTimestamp(`note_${timerz}`);
    };

    const setServerInfo = () => {
        setServerData({
            user_id: userId,
            media_id: mediaId,
            note_body: activeNoteInTextArea,
            note_last_updated: isAnUpdatedNote ? new Date() : false,
            note_timestamp: noteWithTimestamp
        });
    };

    async function handleNoteSubmit (event) {
        event.preventDefault();
        setServerInfo();

        if (serverData) {
            await Axios.post('http://localhost:3001/usingle', serverData)
            .then((res) => { console.log(res)})//updateNotesList(); })
            .catch(error => { console.error('Error:', error); });
        }
    };

    return (
        <>
        <section className="notesContainer" draggable="true">
            
            {/* <button className="toggleNotePad" onClick={(e) => {e.preventDefault(); setHideNotePad(!hideNotePad)}}>
                Make A Note
            </button> */}

            <div className={hideNotePad ? "hideNotePad notePad" : "notePad"}>
                <form className="hereThere" onSubmit={(e) => handleNoteSubmit(e)} >
                    {/* <label htmlFor="notePadTextarea" className="notePadLabel">Write thoughts here:</label><br /> */}

                    <button className="notePadSave" type="submit">Save</button>
                    <textarea className="notePadTextarea" 
                        rows="1" 
                        cols="50" 
                        title="Note pad text area" 
                        placeholder="Notes:"
                        name="note"
                        maxLength="500"
                        value={activeNoteInTextArea}
                        onChange={(event)=>setActiveNoteInTextArea(event.target.value)}>
                    </textarea>

                    {/* <br />

                    <span className="notePadOptions">
                        <button className="larger" type="button" onClick={() => handleSizeChange('larger')}>Larger</button>
                        <button className="smaller" type="button" onClick={() => handleSizeChange('smaller')}>Smaller</button>
                        <button className="normal" type="button" onClick={() => handleSizeChange('normal')}>Normal</button> 
                        <br />
                        <button className="notePadClear" type="button" onClick={() => document.querySelector(".notePadTextarea").value = ""}>Clear</button>
                    </span> */}
                </form>
            </div>

            <div>
                {console.log(JSON.stringify(serverData))}
                <br />-----------------
                <br /> activeNoteInTextArea: "{activeNoteInTextArea}"
                <br /> userId: {userId} ({typeof userId}), mediaId: {mediaId} ({typeof mediaId})
                <br /> currentNotesList: [{currentNotesList}]
                <br /> noteWithTimestamp: "{noteWithTimestamp}" <br />
                -------------
            </div>

            {
                // if note update send along with the form data "note_last_updated: rightNow"
            }
            <ul className="notesList">
                {notesList ? (
                    notesList.map((noteInList, key) => {
                        return <div key={key}>
                            <span onClick={(e)=>loadNote(e, noteInList)}>Note: "<em>{noteInList}</em>..."</span>
                        </div>;
                    })
                ) : (
                    <span>No notes</span>
                )}
            </ul>

            {/* <ul className="noteDetails">
                {noteDetails ? (
                    <>
                        <p>Most recent notes:</p>
                        {
                            noteDetails.map(({nLink, nContents, nTimestamp, nId}) => {
                                return <div key={nId}>
                                    <a href="ok" onClick={(e)=>loadNote(e, nContents, nTimestamp, nId)}>
                                        Note: "<em>{nLink}</em>..."
                                    </a>
                                </div>;
                            })
                        }
                    </>
                ) : (
                    <span>No notes were saved for this audio</span>
                )}
            </ul> */}
        </section>
        </>
    );
};

export default NoteTaker;