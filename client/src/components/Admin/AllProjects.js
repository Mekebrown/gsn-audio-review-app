import React, { useContext } from "react";
import allProjects from "../tools/dummy_data"
import { UserContext } from "../tools/helper_functions";
import Home from "../Home";

/**
 * This page will show all projects.
 * 
 * @returns {Node} AllProjects
 */
const AllProjects = () => {
    const {userId, setUserId} = useContext(UserContext);

    return (<>
        {userId ? <main>
            <button onClick={() => setUserId(null)}>Log Out</button> 
            
            <header>
                <h2>{allProjects.project_name}</h2>
            </header>

            <ul>
                <li>File name: {allProjects.file_name}</li>
                <li>Length: {allProjects.length}</li>
                <li>Total notes: {allProjects.totalNotes}</li>
                <li>Created: {allProjects.creation_datetime}</li>
            </ul>
        </main> : <Home />}
    </>);
}; 

export default AllProjects;
