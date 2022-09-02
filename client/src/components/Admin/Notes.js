import React, { useContext, useEffect } from "react";
import allNotesForAllProjects from "../tools/dummy_data";
import { indvlProjectPath } from "../tools/envs";
import { UserContext } from "../UserLogin";
import axios from "axios";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} Notes
 */
const Notes = () => {
    const {userId} = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/retrieve-info/all")
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });
    
    return (
        <section>
            <header>
                <h2>Projects</h2>
            </header>

            {allNotesForAllProjects.map(project => 
                <section key={project[0].key}>
                    <h3>
                        <a href={indvlProjectPath}>{project[0].name}</a>
                    </h3>

                    <ul>
                        {project[0].notes.map(note => 
                        <li key={note.id} className="clickable tooltip">
                            <h4>Reviewer: {note.user}</h4>

                            <p>Posted on: {note.posted}</p>

                            <figure>
                                <blockquote>
                                    <p><a href={indvlProjectPath}>
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
        </section>
    )
}; 

export default Notes;
