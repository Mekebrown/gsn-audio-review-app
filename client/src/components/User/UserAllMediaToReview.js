import React from "react";
import allMediaToReview from "../tools/dummy_data";

/**
 * This page will show every user and their notes.
 * 
 * @returns {Node} UserAllMediaToReview
 */
const UserAllMediaToReview = () => {
    return (
        <section>
            <header>
                <h2>All Media to Review</h2>
            </header>

            {allMediaToReview.map(track => 
                <section key={track[0].key}>
                    <h3>
                        <a href="/">{track[0].userName}</a>
                    </h3>

                    <ul>
                        {track[0].usersNotes.map(note => 
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
    )
}; 

export default UserAllMediaToReview;
