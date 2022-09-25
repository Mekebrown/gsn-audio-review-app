import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../tools/user-context/UserGlobalContextProvider';
import "./AllMediaProjects.css";
import NoMediaDisplay from "../NoMediaDisplay";

/**
 * This page will show all projects.
 * 
 * /review
 * 
 * @returns {Node} AllMediaProjects
 */
const AllMediaProjects = () => {
    const navigate = useNavigate();

    const [allProjectsInfo, setAllProjectsInfo] = useState(null);

    const { user } = useAuth();

    const handleNoteSubmit = (e) => {
        e.preventDefault();

        const whatToSend = {
            note_body: e.target[0].value,
            media_id: e.target[1].value,
            user_id: e.target[2].value,
            note_timestamp: e.target[3].value,
        };
    };

    useEffect(() => {
        if (user !== {}) {
            axios.get("/api/media")
                .then((res) => {
                    if (res.status && res.status === 200) {
                        setAllProjectsInfo(res.data.media_items);
                    } else navigate('/');
                })
                .catch(() => /* do nothing*/ { });
        } else navigate('/login');
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

                <h3>All Media</h3>
                {allProjectsInfo.map(project => {
                    let notesQuantity = project.notes.length;
                    let descToDisplay = project.media_desc.length > 50 ? project.media_desc.substring(0, 50) + "..." : project.media_desc;
                    let audio = new Audio(project.file_directory + project.file_name + ".mp3");
                    let audioLength;

                    audio.addEventListener("loadedmetadata", (event) => { if (!audioLength) audioLength = event.path[0].duration; });
                    audio.addEventListener("loadeddata", (event) => { if (!audioLength) audioLength = event.path[0].duration; });
                    audio.addEventListener('durationchange', (event) => { if (!audioLength) audioLength = event.path[0].duration; });

                    return <div key={project.id} style={{ border: "1px solid grey", borderRadius: "3px" }}>
                        <i className={`fa fa-play`} style={{ cursor: "pointer" }} onClick={event => {
                            if (audio.paused) {
                                event.target.setAttribute("class", `fa fa-pause`);
                                audio.play();
                            } else {
                                event.target.setAttribute("class", `fa fa-play`);
                                audio.pause();
                            }
                        }}></i>

                        <i className="fa fa-plus" onClick={event => {
                            let note = event.target.nextElementSibling;

                            if (note.getAttribute("class") === `note-${project.id} hiddenComment`) {
                                note.setAttribute("class", `note-${project.id}`);
                                event.target.setAttribute("class", `fa fa-window-close`);
                            } else {
                                note.setAttribute("class", `note-${project.id} hiddenComment`);
                                event.target.setAttribute("class", `fa fa-plus`);
                            }
                        }}></i>
                        <form className={`note-${project.id} hiddenComment`} onSubmit={handleNoteSubmit}>
                            <textarea title="addComment" placeholder={"Note for " + audio.currentTime.toFixed(2) + ":"} />
                            <input type="hidden" title="mediaId" value={project.id} />
                            <input type="hidden" title="timestamp" value={audio.currentTime.toFixed(2)} />
                            <button type="submit">Add Note</button>
                        </form>

                        {project.project_thumb && <img src={project.project_thumb} alt="thumb" style={{ width: "25px" }} />}

                        <span>
                            <h4>{project.project_name}</h4>
                            <small>{descToDisplay}</small>
                        </span>

                        <p>{notesQuantity > 0 ? notesQuantity : "No"} notes</p>

                        <Link to={`/api/media/${project.id}`}>View</Link>
                    </div>;
                })}
            </section> : <NoMediaDisplay />
        }
    </>);
};

export default AllMediaProjects;
