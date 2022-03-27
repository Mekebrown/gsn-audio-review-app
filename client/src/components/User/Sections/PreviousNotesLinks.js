import React from "react";

const PreviousNotesLinks = ({notesList}) => {
    const theNotePadTextarea = document.querySelector("#notePadTextarea");
    const theFullNotePad = document.querySelector("#notePad");

    const loadNote = (e, noteInList) => {
        e.preventDefault();

        if (theNotePadTextarea) {
            theFullNotePad.removeAttribute("class")
            theNotePadTextarea.value = noteInList;
        }
    };

    return (    
        <section id="notesList">
        <ul>
            {notesList ? (
                notesList.map((noteInList, key) => {
                    return <div key={key}><a href="#" onClick={(e)=>loadNote(e, noteInList)}>Note: "<em>{noteInList}</em>..."</a></div>;
                })
            ) : (
                <span>No notes</span>
            )}
        </ul>
    </section>
    );
};

export default PreviousNotesLinks;