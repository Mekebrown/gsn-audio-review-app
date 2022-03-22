import React from "react";

const PreviousNotesLinks = ({notesList}) => {
    return (
        
        <section id="notesList">
        <ul>
            {notesList ? (
                notesList.map((noteInList, key) => {
                    return <div key={key}>Note: {noteInList}</div>;
                })
            ) : (
                <span>No notes</span>
            )}
        </ul>
    </section>
    );
};

export default PreviousNotesLinks;