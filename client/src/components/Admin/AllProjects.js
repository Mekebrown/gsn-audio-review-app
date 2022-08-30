import React, { useContext, useEffect } from "react";
import { projectsList } from "../tools/dummy_data"
import { UserContext } from "../tools/helper_functions";
import Home from "../Home";
import axios from "axios";

/**
 * This page will show all projects.
 * 
 * /review
 * 
 * @returns {Node} AllProjects
 */
const AllProjects = () => {
    const {userId, setUserId} = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/retrieve-info/all")
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });

    return (<>
        {userId ? 
            <section>
                <div style={{border: "2px solid grey", borderRadius: "3px", textAlign: "center"}}>
                    <h3 style={{border: "2px dashed grey", borderRadius: "3px"}}>All Filters</h3>
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
                <h3>All Media</h3>
                {projectsList.map(project => {
                    return <div key={project.key} style={{border: "1px solid grey", borderRadius: "3px"}}>
                        <span>&#xf04b;</span>
                        <span>&#xf067;</span>
                        <img src="" alt=""/>
                        <div style={{display: "inline"}}>
                            <h4>Title</h4>
                            <small></small>
                        </div>
                        <p>4.05 Mins</p>
                        <button type="button">View</button>
                    </div>;
                })}
            </section> : <Home />
        }
    </>);
}; 

export default AllProjects;
