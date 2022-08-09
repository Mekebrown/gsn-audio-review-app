import React from "react";
import AudioPlayerOnly from "./Sections/AudioPlayerOnly";
import singleProject from "../tools/dummy_data";
import { indvlProjectPath } from "../tools/envs";

/**
 * Lance's page to see a single project
 * 
 * @returns {Node} AdminSingleProject
 */
const AdminSingleProject = () => {
    return (
        <section>
            <header>
                <h2>{singleProject.project_name}</h2>
            </header>

            <ul>
                <li>File name: {singleProject.file_name}</li>
                <li>Length: {singleProject.length}</li>
                <li>Total notes: {singleProject.totalNotes}</li>
                <li>Created: {singleProject.creation_datetime}</li>
            </ul>
            
            <hr />

            <AudioPlayerOnly />
{/* 
            {singleProject.map(project => 
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
            )} */}
        </section>
    )
}; 

export default AdminSingleProject;
