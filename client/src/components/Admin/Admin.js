import React, { useContext } from "react";
import Home from "../Home";
import { UserContext } from "../tools/helper_functions";
import singleAdmin from "../tools/dummy_data";

/**
 * Lance's page
 * 
 * @returns {Node} Admin
 */
const Admin = () => {
    const {userId, setUserId} = useContext(UserContext);

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
            </section> : <Home />
        }
    </>);
}

export default Admin;