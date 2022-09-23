import React, { useEffect } from "react";
import { allUsers } from "../tools/dummy_data";
import axios from "axios";

/**
 * This page will show every user and their notes.
 * 
 * @returns {Node} AdminShowAllUsers
 */
const AdminShowAllUsers = () => {
    useEffect(() => {
        axios.get("/api/users")
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (<>
        <section>
            <header>
                <h2>Users</h2>
            </header>

            {allUsers.map(user =>
                <section key={user.key}>
                    <h3>
                        <a href="/">{user.userName}</a>
                    </h3>

                    <ul>
                        {user.usersNotes.map(note =>
                            <li key={note.id} className="clickable tooltip">
                                <h4>Project: {note.project}</h4>

                                <p>Posted note on: {note.posted}</p>

                                <figure>
                                    <blockquote>
                                        <p><a href="/">
                                            {note.content}
                                        </a></p>
                                    </blockquote>
                                </figure>
                                <hr />
                            </li>)}
                    </ul>
                </section>
            )}
        </section>
    </>);
};

export default AdminShowAllUsers;
