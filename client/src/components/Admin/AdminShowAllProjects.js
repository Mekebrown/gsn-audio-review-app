import React, { useEffect, useState } from "react";
import { allProjectsList } from "../tools/dummy_data";
import axios from "axios";
import "./AdminShowAllProjects.css";
import { Link } from "react-router-dom";

/**
 * This page will show all projects.
 * 
 * /review
 * 
 * @returns {Node} AdminShowAllProjects
 */
const AdminShowAllProjects = () => {
    const [allProjectsInfo, setAllProjectsInfo] = useState(null);

    const handleNoteSubmit = (e) => {
        e.preventDefault();

        const whatToSend = {
            note_body: e.target[0].value,
            media_id: e.target[1].value,
            user_id: e.target[2].value,
            note_timestamp: e.target[3].value,
        };

        console.log({ whatToSend });
    };

    useEffect(() => {
        axios.get("/api/is-authenticated?from=media")
            .then((res) => {
                if (res.status === 200) {
                    // setAllProjectsInfo(res.data.results);
                    // setAllProjectsInfo(res.media_items);

                    setAllProjectsInfo(allProjectsList);
                }
            })
            .catch(() => /* do nothing*/ { });
    }, []);

    return (<>
        {allProjectsInfo ?
            <section>
                {/** Search Filters */}
                <section className="search">
                    <div style={{ border: "2px solid grey", borderRadius: "3px", textAlign: "center" }}>
                        <h3 style={{ border: "2px dashed grey", borderRadius: "3px" }}>All Filters</h3>
                    </div>

                    <div>
                        <h2>Search by...</h2>
                        <form>
                            <div id="filterTopRow">
                                <fieldset>
                                    <legend>
                                        <small>Month and year</small>
                                    </legend>
                                    <select className="fa">
                                        <option value="september">
                                            &#xf017; September
                                        </option>
                                    </select>
                                    <select>
                                        <option value="1999">
                                            &#xf017; 1999
                                        </option>
                                    </select>
                                </fieldset>

                                <label>
                                    Users
                                </label>
                                <select>
                                    <option value="meke">
                                        &#xf007; Meke
                                    </option>
                                </select>
                            </div>


                            <div id="filterBottomRow">
                                <label>
                                    Notes
                                </label>
                                <select>
                                    <option value="ascending">
                                        &#xf075; Ascending
                                    </option>
                                </select>

                                <label>
                                    Ratings
                                </label>
                                <select className="filterRatings">
                                    <option value="meke">
                                        &#xf164; Thumbs Up
                                    </option>
                                </select>
                            </div>
                            <button>&#xf5ad; Apply Filters</button>
                        </form>
                    </div>
                </section>

                {/** List of All Media Projects */}
                <h3>All Media</h3>
                {allProjectsInfo.map(project => {
                    let notesQuantity = project.notes.length;
                    let descToDisplay = project.projectDesc.length > 50 ? project.projectDesc.substring(0, 50) + "..." : project.projectDesc;
                    let audio = new Audio(project.mediaFile);
                    let audioLength;

                    audio.addEventListener("loadedmetadata", (event) => { if (!audioLength) audioLength = event.path[0].duration; });
                    audio.addEventListener("loadeddata", (event) => { if (!audioLength) audioLength = event.path[0].duration; });
                    audio.addEventListener('durationchange', (event) => { if (!audioLength) audioLength = event.path[0].duration; });

                    return <div key={project.key} style={{ border: "1px solid grey", borderRadius: "3px" }}>
                        <i className={`fa fa-play`} style={{ cursor: "pointer" }} onClick={event => {
                            if (audio.paused) {
                                event.target.setAttribute("class", `fa fa-pause`);
                                audio.play();
                            } else {
                                event.target.setAttribute("class", `fa fa-play`);
                                audio.pause();
                            }
                            console.log("sup");
                        }}></i>

                        <i className="fa fa-plus" onClick={event => {
                            let note = event.target.nextElementSibling;

                            if (note.getAttribute("class") === `note-${project.key} hiddenComment`) {
                                note.setAttribute("class", `note-${project.key}`);
                                event.target.setAttribute("class", `fa fa-window-close`);
                            } else {
                                note.setAttribute("class", `note-${project.key} hiddenComment`);
                                event.target.setAttribute("class", `fa fa-plus`);
                            }
                        }}></i>
                        <form className={`note-${project.key} hiddenComment`} onSubmit={handleNoteSubmit}>
                            <textarea title="addComment" placeholder={"Note for " + audio.currentTime.toFixed(2) + ":"} />
                            <input type="hidden" title="mediaId" value={project.mediaId} />
                            <input type="hidden" title="timestamp" value={audio.currentTime.toFixed(2)} />
                            <button type="submit">Add Note</button>
                        </form>

                        <img src={project.projectThumb} alt="thumb" style={{ width: "25px" }} />

                        <span>
                            <h4>{project.projectName}</h4>
                            <small>{descToDisplay}</small>
                        </span>

                        <p>{notesQuantity > 0 ? notesQuantity : "No"} notes</p>

                        <Link to={`/admin/retrieve-info/media/${project.mediaId}`}>View</Link>
                    </div>;
                })}
            </section> : (<>
                <h1>Welcome!</h1>
                <p>Here, you will be seeing your uploaded media. Click the button to get started.</p>
                <button>Upload Media</button>
                <br /><br />
                <a href="/logout">Log Out</a> &nbsp; {' '} &nbsp; <a href="https://www.giftedsounds.com">Gifted Sounds Network</a>
            </>)
        }
    </>);
};

export default AdminShowAllProjects;
