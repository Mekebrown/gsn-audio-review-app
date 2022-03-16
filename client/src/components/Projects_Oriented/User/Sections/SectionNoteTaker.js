import React, { useState } from "react";

/**
 * Note creator
 * 
 * @param {Array} notesList
 * 
 * @returns {Node} SectionNoteTaker
 */
const SectionNoteTaker = ({notesList, noteContent, userId}) => {
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState(noteContent);
    
    const handleNoteSubmit = (event) => {
        const {
            noteId,
            projectName,
        } = event;

        const formData = new FormData();
        
        formData.append('user_id', userId);
        formData.append('note', activeNoteInTextArea);
        formData.append('note_id', noteId);
        formData.append('project_name', projectName);
        
        fetch('http://localhost:3001/usingle', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleNoteClearing = () => {};
    const handleSizeChange = (change) => {};
    const handleListChange = (noteToChange) => {
    }; // Deleting, editing, updating a saved note

    return (
        <section id="notesContainer" draggable="true">
            <div id="notePad">
                <label htmlFor="notePadTextarea" id="notePadLabel">Write thoughts here:</label><br />

                <textarea id="notePadTextarea" 
                    rows="10" 
                    cols="50" 
                    title="Note pad text area" 
                    placeholder="Notes:"
                    name="note"
                    value={activeNoteInTextArea}
                    onChange={(event)=>{setActiveNoteInTextArea(event.target.value)}}
                >
                </textarea>
            </div>

            <span id="notePadOptions">
                <button id="larger" onClick={() => handleSizeChange('larger')}>Larger</button>
                <button id="smaller" onClick={() => handleSizeChange('smaller')}>Smaller</button>
                <button id="normal"onClick={() => handleSizeChange('normal')}>Normal</button> 
                <br />
                <button id="notePadSave" onSubmit={(event) => handleNoteSubmit(event)}>Save</button>
                <button id="notePadClear" onSubmit={handleNoteClearing}>Clear</button>
            </span>

            <hr />

            {/* <ul onChange={handleListChange}>
                {
                    notesList.map((noteInList, key) => {
                        return <div key={key}>{noteInList}</div>;
                    })
                }
            </ul> */}
        </section>
    );
};

export default SectionNoteTaker;