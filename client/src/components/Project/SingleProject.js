import React from "react";
import singleProject from "../data/single_project_dummy_data";

/**
 * This page will show a single project's info.
 * 
 * @returns {Node} SingleProject
 */
const SingleProject = () => {
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
            </main>
        </>
    )
}; 

export default SingleProject;
