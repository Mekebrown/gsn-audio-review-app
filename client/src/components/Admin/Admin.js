import React, { useContext, useEffect } from "react";
import Home from "../Home";
import { UserContext } from "../tools/helper_functions";
import axios from "axios";

/**
 * Lance's page
 * 
 * @returns {Node} Admin
 */
const Admin = () => {
    const {userId, setUserId} = useContext(UserContext);

    useEffect(() => {
        axios.get("/")
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });

    return (<>
        {userId ?
            <section>
                {/** TBD */}
            </section> : <Home />
        }
    </>);
}

export default Admin;