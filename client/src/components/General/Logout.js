import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import UserGlobalContext from '../tools/UserGlobalContext';

const Logout = () => {
    const userGlobalContext = useContext(UserGlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/api/logout", null, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    userGlobalContext.setUser({});

                    navigate('/');
                } else {
                    throw new Error();
                }
            })
            .catch((error) => {
                console.error(`Couldn't log the user out: ${error}`);
            });
    }, []);

    return <div>Bye!</div>;
};

export default Logout;
