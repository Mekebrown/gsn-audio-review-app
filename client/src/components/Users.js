import React from "react";
import usersData from "./data/users_dummy_data";

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
                {usersData.map(user => 
                    <section key={user[0].key}>
                        <h3>
                            <a href="/user_page">{user[0].userName}</a>
                        </h3>

                        <ul>
                            {user[0].usersNotes.map(note => 
                            <li key={note.id} className="clickable tooltip">
                                <h4>Project: {note.project}</h4>

                                <p>Posted note on: {note.posted}</p>

                                <figure>
                                    <blockquote>
                                        <p><a href="/user_page">
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
