import React, { useState } from "react";
import Axios from "axios";
import stylesheet from "../../../../App.css";

/**
 * Note creator
 * 
 * @param {Object} noteDetails
 * 
 * @returns {Node} SectionNoteTaker
 */
const SectionNoteTaker = ({noteDetails}) => {
    const {
        projectName, // Need for final save
    } = noteDetails;

    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");
    const [hideNotePad, setHideNotePad] = useState(true);

    const handleNoteSubmit = (event) => {
        event.preventDefault();

        if (activeNoteInTextArea) {
            let cNV = activeNoteInTextArea.split(" ");
            let toShow = cNV.length > 3 ? cNV[0] + " " + cNV[1] + " " + cNV[2] + " ...": activeNoteInTextArea;

            // const {
            //     fileName,
            //     notesList,
            //     noteContent,
            //     userId,
            //     noteId,
            //     thumbRating
            // } = event.target;

            // const formData = new FormData();
            
            // formData.append('user_id', userId);
            // formData.append('note', activeNoteInTextArea);
            // formData.append('note_id', noteId);
            // formData.append('project_name', projectName);
            // formData.append('file_name', fileName);
            // formData.append('creationDateTime', new Date());
            // formData.append('notes_list', notesList);
            // formData.append('note_content', noteContent);
            // formData.append('thumb_rating', thumbRating);
            
            // Axios.post('http://localhost:3001/usingle', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(result => {
            //     console.log('Success:', result);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        }
    };

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
                    <br />
                    <button type="submit">Save</button>
                </form>
            </div>

            {/* <span id="notePadOptions"> */}
                {/* <button id="larger" onClick={() => console.log(change)// handleSizeChange('larger')}>Larger</button>
                <button id="smaller" onClick={() => console.log(change)// handleSizeChange('smaller')}>Smaller</button>
                <button id="normal"onClick={() => console.log(change)// handleSizeChange('normal')}>Normal</button> 
                <br /> */}
                {/* <button id="notePadSave" onClick={(event) => handleNoteSubmit(event)}>Save</button> */}
                {/* <button id="notePadClear" onClick={() => document.querySelector("#notePadTextarea").clear()}>Clear</button> */}
            {/* </span> */}
        </section>
    );
};

export default SectionNoteTaker;