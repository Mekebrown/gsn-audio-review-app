import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../UserLogin";
import axios from "axios";
import Home from "../../Home";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} AdminSendPW
 */
const AdminSendPW = () => {
    const { userId } = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/retrieve-info/all")
            .then(data => console.log(data))
            .catch(error => console.log(error));
    });

    return (<>
        {userId ?
            <section>
                <header>
                    <h2>Single Note from user [USER NAME], UID #{userId}</h2>
                </header>

                Note body

                Note timestamp

                created on

                Updated? No/Yes, on datetime
            </section> : <Home />
        }
    </>);
};

export default AdminSendPW;
