import React, {useState, useEffect} from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('/notes/').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => {
            setNotes(jsonRes.notesList);
        });
    }, [setNotes]);

    return (
        <div>
            {notes.map(note => <li key={note}>{note}</li>)}
        </div>
    )
}; 

export default Notes;
