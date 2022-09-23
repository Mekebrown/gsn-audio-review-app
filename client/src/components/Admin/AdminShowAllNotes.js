import React, { useEffect } from "react";
import axios from "axios";
import { allNotesForAllProjects } from "../tools/dummy_data";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} AdminSingleNote
 */
const AdminSingleNote = () => {
    useEffect(() => {
        axios.get("/api/notes")
            .then(data => console.log(data))
            .catch(error => console.log(error));
    });

    return (<>
        <section>
            {allNotesForAllProjects.map(project =>
                <li key={project.key} className="clickable tooltip">
                    <h4>Project Name: {project.name}</h4>

                    <figure>
                        <blockquote>
                            <p>
                                {project.notes.map(note => {
                                    return <a href="/" key={note.id}>
                                        {note.content}
                                    </a>;
                                })}
                            </p>
                        </blockquote>
                    </figure>

                    <span className="tooltiptext">Want this whole block clickable or nah?</span>

                    <hr />
                </li>)
            }
        </section>
    </>);
};

export default AdminSingleNote;
