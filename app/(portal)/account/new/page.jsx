"use client";

import { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @description A Modal component showing a form to 
 * configure and send a new user their
 * account details
 * 
 * @returns {JSX.Element}
 */
export default function NewUserCreationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [mediaChecked, setMediaChecked] = useState([]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPW, setCopiedPW] = useState(false);

  const [show, setShow] = useState(true);

  const media = [
    {
      id: 1,
      title: "test1"
    },
    {
      id: 2,
      title: "test2"
    }
  ];

  const handleClose = () => {
    setShow(false);
    setSendPW(false);
  }

  const handleShow = () => {
    setShow(true);
    setSendPW(true);
  }

  const handleEmailCopy = () => {
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

  const handlePWCopy = () => {
    if (navigator?.clipboard !== undefined) {
      navigator.clipboard
        .writeText(newMemberData.pw)
        .then(
          () => {
            /* clipboard successfully set */
            setCopiedPW(true);

            setTimeout(() => {
              setCopiedPW(false);
            }, 2000);
          },
          () => {
            /* clipboard write failed */
          },
        );
    }
  }

  const handleCheck = (e) => {
    const { checked, value } = e.target;

    if (checked && !mediaChecked.includes(value)) {
      setMediaChecked([...mediaChecked, value]);
    } else {
      setMediaChecked(mediaChecked.filter((item) => item !== value));
    }
  }

  const handleCheckAll = () => {
    if (mediaChecked.length === media.length) {
      setMediaChecked([]);
    } else {
      setMediaChecked(media.map(item => item.id));
      setMediaChecked(true);
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

    if (email !== '' && (!email.includes('@') || !email.includes('.'))) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setError('');
      setSuccess(false);
      setLoading(true);

      // In an async function:
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

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Send Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSend}>
            {/* Name of New User */}
            <div className="form-group">
              <label htmlFor="clientName">Client Name</label>

              <input
                type="text"
                className="form-control"
                id="clientName"
                placeholder="Enter name"
                value=""
              />
            </div>

            {/* Email of New User */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={handleEmailCopy}>
                  {copiedEmail ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCopy} />}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />

                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handlePWCopy}>
                    {copiedPW ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCopy} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Checklist of All Media */}
            {/* TODO update htmlFor for labels */}
            <div className="form-group">
              <label htmlFor="checklistToggle">Media</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={() => mediaChecked.length === media.length}
                  id="checklistToggle"
                  onChange={handleCheckAll}
                />

                <label className="form-check-label" htmlFor="all">All</label>
              </div>

              {media.map(item => (
                <div className="form-check" key={item.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.id}
                    id={item.id}
                    checked={() => mediaChecked.includes(item.id) || mediaChecked.length === media.length}
                    onChange={handleCheck}
                  />

                  <label className="form-check-label" htmlFor={item.id}>{item.title}</label>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Email sent!</Alert>}

            {/* Form Submit */}
            <Button variant="primary" type="submit" disabled={loading}>Send</Button>
            <button type="reset">Clear All</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
