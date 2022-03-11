import React from "react";
import SectionAudioPlayerOnly from "./Sections/SectionAudioPlayerOnly";
import singleProject from "../../data/admin_project_dummy_data";

/**
 * Lance's page to see a single project
 * 
 * @returns {Node} AdminSingleProject
 */
const AdminSingleProject = () => {
    return (
        <>
            <header>
                <h2>{singleProject.project_name}</h2>
            </header>

            <main>
                <ul>
                    <li>File name: {singleProject.file_name}</li>
                    <li>Length: {singleProject.length}</li>
                    <li>Total notes: {singleProject.totalNotes}</li>
                    <li>Created: {singleProject.creation_datetime}</li>
                </ul>
                
                <hr />

                <SectionAudioPlayerOnly />

                {singleProject.map(project => 
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

export default AdminSingleProject;
