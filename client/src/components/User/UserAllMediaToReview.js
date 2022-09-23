import React, { useEffect, useState } from "react";
import { userOneMediaProject } from "../tools/dummy_data";
import axios from "axios";

/**
 * This page will show every user and their notes.
 * 
 * @returns {Node} UserAllMediaToReview
 */
const UserAllMediaToReview = () => {
    const [allUserProjectsInfo, setAllUserProjectsInfo] = useState(null);

    useEffect(() => {
        try {
            axios.get("/api/media")
                .then(data => {
                    setAllUserProjectsInfo(userOneMediaProject);
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (<>
        {allUserProjectsInfo ?
            <section>
                <header>
                    <h2>All Media to Review</h2>
                </header>

                {allUserProjectsInfo.map(track =>
                    <section key={track.key}>
                        <h3>
                            <a href="/">{track.projectName}</a>
                        </h3>
                    </section>
                )}
            </section> : (<>
                <h1>Welcome!</h1>
                <p>Here, you will be seeing your uploaded media. Click the button to get started.</p>
                <button>Upload Media</button>
                <br />
                <a href="/logout">Log Out</a><a href="https://www.giftedsounds.com">Gifted Sounds Network</a>
            </>)
        }
    </>);
};

export default UserAllMediaToReview;
