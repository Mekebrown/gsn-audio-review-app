import React, { useContext, useEffect } from "react";
import Home from "../Home";
import { UserContext } from "../tools/helper_functions";
import singleProject from "../tools/dummy_data";
import axios from "axios";

/**
 * Lance's page to see a single project
 * 
 * @returns {Node} AdminSingleProject
 */
const AdminSingleProject = ({mediaId}) => {
    const {userId, setUserId} = useContext(UserContext);

    useEffect(() => {
        axios.get(`/api/retrieve-info/${mediaId}`)
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });

    return (<>
        {userId ?
            <section>
                <div style={{border: "1px solid grey"}}>
                    <div>
                        <img src="" alt="Play button default" />
                    </div>
                    
                    <div className="wavForm">
                        <small>00:00</small>
                        <small>48:12</small>
                    </div>

                    <div>
                        <h3>Team Name</h3>
                        <h2>Project Name</h2>
                        <p>This will have some kind of text, I dunno</p>
                    </div>
                </div>

                <div style={{border: "1px solid grey"}}>
                    <nav>
                        <button>Share</button>
                        <button>Make A Note</button>
                        <button>Delete</button>
                    </nav>

                    <nav>                    
                        <button>Share</button>
                        <button>Make A Note</button>
                        <button>Delete</button>
                    </nav>
                </div>

                <div style={{border: "1px solid grey"}}>
                    <img src="" alt=""/>
                    <p>Some text will go here, the description of the media itself. The other description will be about the project (which can have more than one media work).</p>
                    <div style={{backgroundColor: "purple", width: "35px"}}>Tag</div>
                </div>

                <div style={{border: "1px solid grey"}}>
                    Write A Note
                </div>

                <div style={{border: "1px solid grey"}}>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h4>Duane Frank</h4>
                        <p>
                            Lorem ipsum orem ipsum orem ipsum orem ipsum orem ipsum orem ipsum. Lorem ipsum orem ipsum orem ipsum orem ipsum orem ipsum orem ipsum orem ipsum orem ipsum. Lorem ipsum orem ipsum orem ipsum.                        
                        </p>
                    </div>
                </div>
                {singleProject.map(project => 
                    <section key={project[0].key}>
                        <h3>
                            <a href="/">{project[0].name}</a>
                        </h3>

                        <ul>
                            {project[0].notes.map(note => 
                            <li key={note.id} className="clickable tooltip">
                                <h4>Reviewer: {note.user}</h4>

                                <p>Posted on: {note.posted}</p>

                                <figure>
                                    <blockquote>
                                        <p><a href="/">
                                            {note.content}
                                        </a></p>
                                    </blockquote>
                                </figure>

                                <span className="tooltiptext">Want this whole block clickable or nah?</span>

                                <hr />
                            </li>)}
                        </ul>
                    </section>
                )}
            </section> : <Home />
        }
    </>);
}; 

export default AdminSingleProject;
