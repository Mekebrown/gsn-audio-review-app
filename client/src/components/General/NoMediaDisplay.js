import React, { useEffect, useState, useContext } from "react";

// import { useAuth } from '../tools/user-context/UserGlobalContextProvider';

const NoMediaDisplay = () => {
    // const { user } = useAuth();

    useEffect(() => {
        // if (!user) navigate('/login');
    }, []);

    return (
        <div className="noMedia">
            <p>There is no media to display</p>
        </div>
    );
};

export default NoMediaDisplay;
