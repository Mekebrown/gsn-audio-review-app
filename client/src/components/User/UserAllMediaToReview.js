import React, { useEffect, useState } from "react";
import axios from "axios";

import { userOneMediaProject } from "../tools/dummy_data";
import NoMediaDisplay from "../General/NoMediaDisplay";

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
            </section> : (<NoMediaDisplay />)
        }
    </>);
};

export default UserAllMediaToReview;
