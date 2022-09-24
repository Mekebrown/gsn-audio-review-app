import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import { singleUser } from "../../tools/dummy_data";

/**
 * This page will show every note pertaining to every project that exists.
 * 
 * @returns {Node} AdminShowSingleUser
 */
const AdminShowSingleUser = ({ open, onClose, userId }) => {
    const [userInfo, setUserInfo] = useState({});

    const modalStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '50px',
        zIndex: 1000
    };

    const overlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 1000
    };

    useEffect(() => {
        try {
            axios.get(`/api/users/${userId}`)
                .then(data => {
                    setUserInfo(singleUser);
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        };
    }, []);

    if (!open) return null;

    return ReactDom.createPortal(
        <>
            {userInfo ? <>
                <div style={overlayStyles} />
                <div style={modalStyles}>
                    <button onClick={onClose}>X</button>
                    <br />
                    A single user's info will be shown here for user #{userId}
                    <br />
                    {JSON.stringify(userInfo)}
                </div></> : null}
        </>,
        document.getElementById('portal')
    );
};

export default AdminShowSingleUser;
