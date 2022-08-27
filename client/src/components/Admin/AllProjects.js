import React, { useContext } from "react";
import projectsList from "../tools/dummy_data"
import { UserContext } from "../tools/helper_functions";
import Home from "../Home";
import { noteInfo } from "../tools/vars";

/**
 * This page will show all projects.
 * 
 * @returns {Node} AllProjects
 */
const AllProjects = () => {
    const {userId, setUserId} = useContext(UserContext);

    return (<>
        {userId ? <section>
            <button onClick={() => setUserId(null)}>Log Out</button> 
            
            <header>
                <h2>All Projects</h2>
            </header>

            {projectsList.map(project => {
                return <ul key={project.key}>
                    <li>Project name: {project.projectName}</li>
                    <li>Total notes: {project.notes.length}</li>
                    <li>Created: {project.creation_datetime}</li>
                </ul>;
            })}
        </section> : <Home />}
    </>);
}; 

export default AllProjects;
