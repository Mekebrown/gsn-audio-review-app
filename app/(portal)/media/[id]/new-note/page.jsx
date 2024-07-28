"use client";

import React, { useState } from 'react';

import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Modal from '@/app/ui/Modal';

/**
 * @description A Modal component showing a form to 
 * create a note for a specific track
 * 
 * @param {function} onClose
 * 
 * @returns {JSX.Element}
 */
export default function Page({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [copiedNote, setCopiedNote] = useState(false);
    const mediaId = 1;
    const note = {
        title: "The Title Is Okay",
        body: "kewl!"
    };
    const noteTitle = note.title ? note.title : "Create New Note";

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
            // const response = await fetch(apiURL + '/portal/account', {
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

            // const resJSON = await response.json();
            // const {data} = resJSON;

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

    const handleNoteCopy = () => {
        if (navigator?.clipboard !== undefined) {
            navigator.clipboard
                .writeText(email)
                .then(
                    () => {
                        /* clipboard successfully set */
                        setCopiedEmail(true);

                        setTimeout(() => {
                            setCopiedEmail(false);
                        }, 2000);
                    },
                    () => {
                        /* clipboard write failed */
                    },
                );
        }
    }

    return (
        <Modal onClose={onClose}>
            <h1>{noteTitle}</h1>

            <p>{note.body}</p>

            <form onSubmit={handleSend}>
                {/* Note Body */}
                <div className="form-group">
                    <label htmlFor="noteBody">Note</label>

                    <input
                        type="text"
                        className="form-control"
                        id="noteBody"
                        placeholder="Enter your note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />

                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleNoteCopy}>
                            {copiedNote ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCopy} />}
                        </button>
                    </div>
                </div>

                <input
                    type="hidden"
                    className="form-control"
                    id="userId"
                    name="userId"
                    value={userId}
                />

                <input
                    type="hidden"
                    className="form-control"
                    id="mediaId"
                    name="mediaId"
                    value={mediaId}
                />

                {/* Alerts */}
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Note saved!</Alert>}

                {/* Form Submit */}
                <Button variant="primary" type="submit" disabled={loading}>Save Note</Button>
                <button type="reset">Clear All</button>
            </form>
        </Modal>
    );
};
