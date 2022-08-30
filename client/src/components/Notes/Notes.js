import React, {useState} from "react";

/**
 * @returns {Node} Notes
 */
const Notes = () => {
    const [isAnUpdatedNote, setIsAnUpdatedNote] = useState(false);
    
    const theNotePadTextarea = document.querySelector(".notePadTextarea");
    const theFullNotePad = document.querySelector(".notePad");

    const loadNote = (e, noteInList) => {
        e.preventDefault();

        if (theNotePadTextarea && theFullNotePad) {
            theFullNotePad.removeAttribute("class");
            theFullNotePad.classList.remove("hideNotePad");

            theNotePadTextarea.value = noteInList.nContents;

            setIsAnUpdatedNote(true);
        }
    };

    return <div className="notesList">
        {["note 1", "note 2", "this", "works?"].map((note) => {
            return <li key={note.nId} onClick={(e)=>loadNote(e, note)}>
                Note from timestamp {note.nTimestamp}: "<em>{note.nLink}</em>"
            </li>;
        })}
    </div>
}; 

export default Notes;
