import React from "react";
import allProjects from "../tools/dummy_data"

/**
 * This page will show all projects.
 * 
 * @returns {Node} AllProjects
 */
const AllProjects = () => {
    return (
        <>
            <header>
                <h2>{allProjects.project_name}</h2>
            </header>

            <main>
                <ul>
                    <li>File name: {allProjects.file_name}</li>
                    <li>Length: {allProjects.length}</li>
                    <li>Total notes: {allProjects.totalNotes}</li>
                    <li>Created: {allProjects.creation_datetime}</li>
                </ul>
            </main>
        </>
    )
}; 

export default AllProjects;
