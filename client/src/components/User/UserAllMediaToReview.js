import React, { useContext, useEffect } from "react";
import { allMediaToReview } from "../tools/dummy_data";
import { UserContext } from "../../UserLogin";
import Home from "../Home";
import axios from "axios";

/**
 * This page will show every user and their notes.
 * 
 * @returns {Node} UserAllMediaToReview
 */
const UserAllMediaToReview = () => {
    const { userId } = useContext(UserContext);

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
        {userId ?
            <section>
                <header>
                    <h2>All Media to Review</h2>
                </header>

                {allMediaToReview.map(track =>
                    <section key={track.key}>
                        <h3>
                            <a href="/">{track.userName}</a>
                        </h3>

                        <ul>
                            {track.usersNotes.map(note =>
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
            </section> : <Home />
        }
    </>);
};

export default UserAllMediaToReview;
