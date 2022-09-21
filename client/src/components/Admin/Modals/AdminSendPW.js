import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../UserLogin";
import axios from "axios";
import Home from "../../Home";

/**
 * This page will show every note pertaining to every project that exists.
 * Have option to email user the password.
 * 
 * @returns {Node} AdminSendPW
 */
const AdminSendPW = () => {
    const { userId } = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/send-pw")
            .then(data => console.log(data))
            .catch(error => console.log(error));
    });

    return (<>
        {userId ?
            <section>
                <header>
                    <h2>Send A New Password</h2>
                </header>
            </section> : <Home />
        }
    </>);
};

export default AdminSendPW;
