import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";

/**
 * Lance's page to create a user and send them a password.
 * 
 * @returns {Node} AdminSendPW
 */
const AdminSendPW = ({ open, onClose }) => {
    const [isNewUserCreated, setIsNewUserCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectsToAssign, setProjectsToAssign] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        projects: [],
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let setPWMsg = document.getElementById("setPWMsg");
        setPWMsg.setAttribute("role", "alert");

        setLoading(true);

        axios.post("/api/send-pw", formData, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.user);
                } else {
                    throw new Error();
                }
            })
            .catch((error) => {
                setPWMsg.textContent = "Registration failed";
            })
            .finally(() => {
                setLoading(false);
                setIsNewUserCreated(true);
            });
    };

    useEffect(() => {
        // axios.get("/api/media")
        //     .then(data => setProjectsToAssign(data.data))
        //     .catch(err => console.error(err));
    }, []);


    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} />

            <div style={modalStyles}>
                <button onClick={onClose}>X</button>
                <p id="setPWMsg"></p>
                {isNewUserCreated ? <p>Success! A user will be created and a password will be sent to them.</p> :
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                        {projectsToAssign.map((project) => {
                            return <label htmlFor={`project-${project.id}`}>{project.project_name}
                                <input
                                    type="checkbox"
                                    name="assign-projects"
                                    id={`project-${project.id}`}
                                    value={project.id}
                                    onChange={(e) => setFormData({ ...formData, projects: [...formData.projects, e.target.value] })} />
                                <span>{project.media_desc}</span>
                            </label>;
                        })}
                        <p>When ready, click the button below to send them an invite.</p>

                        <button type="submit" loading={loading}>Send Password</button>
                    </form>
                }
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default AdminSendPW;
