import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";

/**
 * A modal for reviewers to message the admin.
 * 
 * @returns {Node} ContactForm
 */
const ContactForm = ({ open, onClose }) => {
    const [reasonGiven, setReasonGiven] = useState("");
    const [message, setMessage] = useState("");
    const [formSent, setFormSent] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Not saved in state to add alert role when relevant
        let contactMsgAlert = document.getElementById("contactMsgAlert");
        contactMsgAlert.setAttribute("role", "alert");

        const formData = new FormData();

        formData.append("reason", reasonGiven);
        formData.append("message", message);

        await axios.post("/api/contact", formData)
            .then((res) => {
                if (res.status !== 200) {
                    contactMsgAlert.textContent = "Unfortunately your message did not go through. Please try again.";

                    // eslint-disable-next-line no-throw-literal
                    throw "Contact form not submitted";
                } else {
                    setFormSent(true);
                    contactMsgAlert.textContent = "Thank you for your message. We will get back to you as soon as possible.";
                }
            })
            .catch(() => contactMsgAlert.textContent = "Unfortunately your message did not go through. Please try again.");
    };

    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} />
            <div style={modalStyles}>
                <button onClick={onClose}>X</button>

                {formSent ? <p id="contactMsgAlert">Contact Form</p> :
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="reason">How can we help you?</label>
                        <select id="reason" name="reason" onChange={(e) => setReasonGiven(e.target.value)} required>
                            <option value="bug">I found a bug</option>
                            <option value="feature">I have a feature request</option>
                            <option value="feature">I love/appreciate your app</option>
                            <option value="other">Other</option>
                        </select>

                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" name="message" onChange={(e) => setMessage(e.target.value)} required></textarea>

                        <button type="submit">Send</button>
                    </form>
                }
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default ContactForm;
