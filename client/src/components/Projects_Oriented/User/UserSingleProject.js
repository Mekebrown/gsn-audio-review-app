import React, { useState } from "react";
import SectionAudioPlayerAndControls from "./Sections/SectionAudioPlayerAndControls";
import SectionNoteTaker from "./Sections/SectionNoteTaker";

/**
 * Page for a single media work and notes opportunity
 * 
 * @returns {Node} UserSingleProject
 */
const UserSingleProject = () => {
    const [projectName, setProjectName] = useState("");
    const [fileName, setFileName] = useState("");
    const [audioLength, setAudioLength] = useState(0);
    const [creationDateTime, setcreationDateTime] = useState("");
    const [notesList, setNotesList] = useState("");

   return (
        <>
            <header>
                <h2>{projectName}</h2>
            </header>

            <main>
                <ul>
                    <li>File name: {fileName}</li>
                    <li>Length: {audioLength}</li>
                    <li>Total notes: {notesList.length}</li>
                    <li>Created: {creationDateTime}</li>
                </ul>
                
                <hr />

                <SectionAudioPlayerAndControls />

                <SectionNoteTaker />

                <section id="notesList">   
                    <ul></ul>
                    <section id="done" hidden>
                        <p>Thanks for your contribution. You will be contacted right away!</p>
                    </section>
                </section>
            </main>
        </>
    )
}; 

export default UserSingleProject;
