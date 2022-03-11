import React, { useState } from "react";

/**
 * Note creator
 * 
 * @param {Array} notesList
 * 
 * @returns {Node} SectionNoteTaker
 */
const SectionNoteTaker = ({notesList}) => {
    const [noteInList, setNoteInList] = useState("");
    const [activeNoteInTextArea, setActiveNoteInTextArea] = useState("");


    const handleNoteSubmit = (event) => {};
    const handleNoteClearing = () => {};
    const handleSizeChange = (change) => {};
    const handleListChange = (noteToChange) => {}; // Deleting, editing, updating a saved note

    return (
        <section id="notesContainer" draggable="true">
            <div id="notePad">
                <label for="notePadTextarea" id="notePadLabel">Write thoughts here:</label><br />

                <textarea id="notePadTextarea" rows="10" cols="50" title="Note pad text area" placeholder="Notes">
                    {activeNoteInTextArea}
                </textarea>
            </div>

            <span id="notePadOptions">
                <button id="larger" onclick={() => handleSizeChange('larger')}>Larger</button>
                <button id="smaller" onclick={() => handleSizeChange('smaller')}>Smaller</button>
                <button id="normal"onclick={() => handleSizeChange('normal')}>Normal</button> 
                <br />
                <button id="notePadSave" onsubmit={(event) => handleNoteSubmit(event)}>Save</button>
                <button id="notePadClear" onsubmit={handleNoteClearing}>Clear</button>
            </span>

            <hr />

            <ul>
                {
                    notesList.map((noteInList, key) => {
                        return <div key={key}>{noteInList}</div>;
                    })
                }
            </ul>
        </section>
    );
};

export default SectionNoteTaker;