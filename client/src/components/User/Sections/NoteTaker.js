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
 * @returns {Node} SectionNoteTaker
 */
const SectionNoteTaker = ({noteDetails}) => {
    const {
        mediaId,
        userId,
    } = noteDetails;

    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(true);

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        const rightNow = new Date();

        if (activeNoteInTextArea !== "") {
            let cNV = activeNoteInTextArea.split(" ");
            let toShow = cNV.length > 3 ? cNV[0] + " " + cNV[1] + " " + cNV[2] + " ..." : activeNoteInTextArea;

            const formData = new FormData();
            
            formData.append('user_id', userId);
            formData.append('creationDateTime', rightNow);
            formData.append('media_id', mediaId);
            formData.append('note_body', activeNoteInTextArea);
            formData.append('note_last_retrieved', rightNow);
            formData.append('note_last_updated', rightNow);
            formData.append('note_timestamp', "note_"); // NEED TIMESTAMP FROM AUDIO!
            
            Axios.post('http://localhost:3001/usingle', {
                method: 'POST',
                body: formData
            })
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    const handleSizeChange = (change) => {};

    return (
        <section id="notesContainer" draggable="true">
            
            <button id="toggleNotePad" onClick={() => setHideNotePad(!hideNotePad)}>
                Make A Note
            </button>

            <div id="notePad" className={hideNotePad ? "hideNotePad" : null}>
                <form onSubmit={handleNoteSubmit}>
                    <label htmlFor="notePadTextarea" id="notePadLabel">Write thoughts here:</label><br />

                    <textarea id="notePadTextarea" 
                        rows="10" 
                        cols="50" 
                        title="Note pad text area" 
                        placeholder="Notes:"
                        name="note"
                        maxLength="500"
                        value={activeNoteInTextArea}
                        onChange={(event)=>{setActiveNoteInTextArea(event.target.value)}}
                    >
                    </textarea>
                </form>

                <span id="notePadOptions">
                    <button id="larger" type="button" onClick={() => handleSizeChange('larger')}>Larger</button>
                    <button id="smaller" type="button" onClick={() => handleSizeChange('smaller')}>Smaller</button>
                    <button id="normal" type="button" onClick={() => handleSizeChange('normal')}>Normal</button> 
                    <br />
                    <button id="notePadSave" type="submit" onClick={(event) => handleNoteSubmit(event)}>Save</button>
                    <button id="notePadClear" type="button" onClick={() => document.querySelector("#notePadTextarea").value = ""}>Clear</button>
                </span>
            </div>
        </section>
    );
};

export default SectionNoteTaker;