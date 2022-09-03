import React, { useContext, useEffect } from "react";
import allNotesForAllProjects from "../tools/dummy_data";
import { indvlProjectPath } from "../tools/envs";
import { UserContext } from "../UserLogin";
import axios from "axios";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} AdminSingleNote
 */
const AdminSingleNote = () => {
    const {userId} = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/retrieve-info/all")
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });
    
    return (
        <section>
            <header>
                <h2>Single Note from user [USER NAME, UID#]</h2>
            </header>

            Note body

            Note timestamp

            created on 

            Updated? No/Yes, on datetime 
        </section>
    )
}; 

export default AdminSingleNote;
