import React, {useState} from "react";
import allNotesForAllProjects from "../tools/dummy_data";
import { indvlProjectPath } from "../tools/envs";

/**
 * @returns {Node} Notes
 */
const Notes = () => {
    return <div className="notesList">
        {notesList.map((note) => {
            return <li key={note.nId} onClick={(e)=>loadNote(e, note)}>
                Note from timestamp {note.nTimestamp}: "<em>{note.nLink}</em>"
            </li>;
        })}
    </div>
}; 

export default Notes;
