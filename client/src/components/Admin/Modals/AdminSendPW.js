import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";

/**
 * Lance's page to create a user and send them a password.
 * 
 * @returns {Node} AdminSendPW
 */
const AdminSendPW = ({ open, onClose }) => {
    const [isNewUserCreated, setIsNewUserCreated] = useState(false);
    const [isPWGenerated, setIsPWGenerated] = useState(false);

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

    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} />
            <div style={modalStyles}>
                <button onClick={onClose}>X</button>
                {isNewUserCreated ? <p>Success! A user will be created and a password will be sent to them.</p> :
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />

                        <button onclick={setIsPWGenerated(true)}>Generate Password</button>

                        {isPWGenerated ? <>
                            <p>When ready, click the button below to send them a password.</p>
                            <button onClick={setIsNewUserCreated(true)}>Send Password</button> </> : null}
                    </form>
                }
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default AdminSendPW;
