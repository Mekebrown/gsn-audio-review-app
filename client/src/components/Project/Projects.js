import React from "react";
import projectsData from "../data/projects_dummy_data"

/**
 * This page will show all projects.
 * 
 * @returns {Node} Projects
 */
const Projects = () => {
    return (
        <>
            <header>
                <h2>{projectsData.project_name}</h2>
            </header>

            <main>
                <ul>
                    <li>File name: {projectsData.file_name}</li>
                    <li>Length: {projectsData.length}</li>
                    <li>Total notes: {projectsData.totalNotes}</li>
                    <li>Created: {projectsData.creation_datetime}</li>
                </ul>
            </main>
        </>
    )
}; 

export default Projects;
