import React from "react";
import notesProjectsData from "./data/notes_dummy_data";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} Notes
 */
const Notes = () => {
    return (
        <>
            <header>
                <h2>Projects</h2>
            </header>

            <main>
                {notesProjectsData.map(project => 
                    <section key={project[0].key}>
                        <h3>
                            <a href="/project_page">{project[0].name}</a>
                        </h3>

                        <ul>
                            {project[0].notes.map(note => 
                            <li key={note.id} className="clickable tooltip">
                                <h4>Reviewer: {note.user}</h4>

                                <p>Posted on: {note.posted}</p>

                                <figure>
                                    <blockquote>
                                        <p><a href="/project_page">
                                            {note.content}
                                        </a></p>
                                    </blockquote>
                                </figure>

                                <span className="tooltiptext">Want this whole block clickable or nah?</span>

                                <hr />
                            </li>)}
                        </ul>
                    </section>
                )}
            </main>
        </>
    )
}; 

export default Notes;
