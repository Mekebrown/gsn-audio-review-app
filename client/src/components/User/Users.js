import React from "react";
import allUsers from "../tools/dummy_data";
import { indvlUserPath } from "../tools/envs";

/**
 * This page will show every user and their notes.
 * 
 * @returns {Node} Users
 */
const Users = () => {
    return (
        <>
            <header>
                <h2>Users</h2>
            </header>

            <main>
                {allUsers.map(user => 
                    <section key={user[0].key}>
                        <h3>
                            <a href={indvlUserPath}>{user[0].userName}</a>
                        </h3>

                        <ul>
                            {user[0].usersNotes.map(note => 
                            <li key={note.id} className="clickable tooltip">
                                <h4>Project: {note.project}</h4>

                                <p>Posted note on: {note.posted}</p>

                                <figure>
                                    <blockquote>
                                        <p><a href={indvlUserPath}>
                                            {note.content}
                                        </a></p>
                                    </blockquote>
                                </figure>
                                <hr />
                            </li>)}
                        </ul>
                    </section>
                )}
            </main>
        </>
    )
}; 

export default Users;
