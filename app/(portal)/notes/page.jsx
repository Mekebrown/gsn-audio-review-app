'use client';

import notesExample from "@/app/lib/notes_placeholders";

export default function Page() {
    {
        notesExample.maps(note => {
            return <div>
                <h1>Info for note #{note.noteId}</h1>

                <p>Note #{note.noteId}</p>
            </div>;
        })
    }
};
