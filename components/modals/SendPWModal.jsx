import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheckCircle, faTimes, faEnvelope, faCheck, faExclamationTriangle, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';
import { useNotes } from '../contexts/NotesContext';
import { useUsers } from '../contexts/UsersContext';
import { useSendPW } from '../contexts/SendPWContext';
import { useAlert } from '../contexts/AlertContext';

const SendPWModal = () => {
    const { currentUser } = useAuth();
    const { media } = useMedia();
    const { notes } = useNotes();
    const { users } = useUsers();

    const { sendPW, setSendPW } = useSendPW();

    const { alert, setAlert } = useAlert();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');
    const [mediaChecked, setMediaChecked] = useState([]);
    const [mediaCheckedAll, setMediaCheckedAll] = useState(false);

    const [copied, setCopied] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSendPW(false);
    }

    const handleShow = () => {
        setShow(true);
        setSendPW(true);
    }

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            setMediaChecked([...mediaChecked, e.target.value]);
        } else {
            setMediaChecked(mediaChecked.filter((item) => item !== e.target.value));
        }
    }

    const handleCheckAll = () => {
        if (mediaCheckedAll) {
            setMediaChecked([]);
            setMediaCheckedAll(false);
        } else {
            setMediaChecked(media.map((item) => item.id));
            setMediaCheckedAll(true);
        }
    }

    const handleSend = async (e) => {
        e.preventDefault();

        if (mediaChecked.length === 0) {
            setError('Please select at least one media item.');
            return;
        }

        if (email === '') {
            setError('Please enter an email address.');
            return;
        }

        if (email !== '' && !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            setError('');
            setSuccess(false);
            setLoading(true);

            // Send email with pw and media links
            // const res = await fetch('/api/send-pw', {
            //     method: 'POST',
            //     headers:
            //     {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: email,
            //         pw: pw,
            //         media: mediaChecked
            //     })
            // });

            // const data = await res.json();

            // if (data.error) {
            //     setError(data.error);
            //     setLoading(false);
            //     return;
            // }

            // if (data.success) {
            //     setSuccess(true);
            //     setLoading(false);
            //     return;
            // }
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Send Password
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSend}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" placeholder="Enter password" value={pw} onChange={(e) => setPw(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="media">Media</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="all" id="all" checked={mediaCheckedAll} onChange={handleCheckAll} />
                                <label className="form-check-label" htmlFor="all">
                                    All
                                </label>
                            </div>
                            {media.map((item) => (
                                <div className="form-check" key={item.id}>
                                    <input className="form-check-input" type="checkbox" value={item.id} id={item.id} checked={mediaChecked.includes(item.id)} onChange={handleCheck} />
                                    <label className="form-check-label" htmlFor={item.id}>
                                        {item.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="password" placeholder="Enter password" value={pw} onChange={(e) => setPw(e.target.value)} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={handleCopy}>
                                        {copied ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCopy} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Email sent!</Alert>}
                        <Button variant="primary" type="submit" disabled={loading}>
                            Send
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SendPWModal;
