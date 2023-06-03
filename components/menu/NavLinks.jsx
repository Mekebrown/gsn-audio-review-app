/* 
    Routes: 
    / - msg, log in link
    / - msg, media (project name/link, notes and the users, uploaded date, update link, delete link)
    /login - msg, form (email input, password input), submit button, cancel button
    /logout - redirect to /
    /send-pw* - close icon, msg, form (checkboxes of media, email input, generated pw and "copy" link), submit button, clear button, cancel link
    /delete-user* - close icon, msg, confirm button, cancel link
    /upload* - close icon, msg, form (logo, project name, desc, client, audio, timestamps), submit button, clear button, cancel link
    /delete-upload* - close icon, msg, confirm button, cancel link
    /users - msg, users (link to each user, preview of latest note, list of media, last login, reset pw link, delete user link)
    /notes - msg, notes (note copy, media project name/link, created date)
    /users/:user - email, role, lastLogin, notes, media, created, reset pw link, delete user link
    /notes/:note* - note copy, media project name/link, created date
    /media/:media - msg, project name, description, form (textarea, submit button, cancel button), notes list
    /media/:media - msg (edit), project name (edit), description (edit), list of each note (reply to note link (form: textarea, submit button, cancel button)) 


    Admin types: Send PW*, Upload*, Search~, Media, Notes, Users, Notifs*^, Settings^ 
    Admin icons: User+, Upload, mag glass, music, pad, users, bell, cog

    User types: Media,  Notes, Contact, Notifs*^, Settings^
    User icons: music,  pad,    mail,    bell,      cog

    ~ Top new section
    * Modal
    ^ Dropdown
*/

import { useState } from 'react'; // Notifs/settings menus open on click; (On nav right) mobile hamburger vs open menu links vs nav bar; Mobile logo centered vs on left; Logged in or not; Admin or not; search open or not
import Link from 'next/link';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCopy, faUsers, faComments, faEnvelope, faCheck, faExclamationTriangle, faSpinner, faTimesCircle,faBars, faSearch, faMusic, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import ShowNoteModal from './modals/ShowNoteModal';

// User icon - faUsers - For users
export const UsersIcon = () => {
    return <Link className="users-icon" href="/users">
        <FontAwesomeIcon icon={faUsers} />
    </Link>;
}

// Copy icon - faCopy - For copying pw
export const CopyIcon = () => {
    return <span className="copy-icon">
        <FontAwesomeIcon icon={faCopy} />
    </span>;
}

// Comments icon - faComments - For notes
export const NotesIcon = () => {
    return <span className="notes-icon">
        <FontAwesomeIcon icon={faComments} />
    </span>;
}

// Envelope icon - faEnvelope - For emails
export const EmailIcon = () => {
    return <span className="email-icon">
        <FontAwesomeIcon icon={faEnvelope} />
    </span>;
}

// Check icon - faCheck - For successfull actions
export const SuccessIcon = () => {
    return <span className="success-icon">
        <FontAwesomeIcon icon={faCheck} />
    </span>;
}

// Exclamation triangle icon - faExclamationTriangle - For errors
export const ErrorIcon = () => {
    return <span className="error-icon">
        <FontAwesomeIcon icon={faExclamationTriangle} />
    </span>;
}

// Spinner icon - faSpinner - For loading
export const LoadingIcon = () => {
    return <span className="loading-icon">
        <FontAwesomeIcon icon={faSpinner} />
    </span>;
}

// Times circle icon - faTimesCircle - For closing
export const CloseIcon = () => {
    return <span className="close-icon">
        <FontAwesomeIcon icon={faTimesCircle} />
    </span>;
}

// Hamburger icon - faBars - For mobile menu
export const MobileIcon = () => {
    return <span className="mobile-icon">
        <FontAwesomeIcon icon={faBars} />
    </span>;
}

// Search icon - faSearch - For search
export const SearchIcon = () => {
    return <span className="search-icon">
        <FontAwesomeIcon icon={faSearch} />
    </span>;
}

// Music icon - faMusic - For media
export const MediaIcon = () => {
    return <span className="media-icon">
        <FontAwesomeIcon icon={faMusic} />
    </span>;
}

// Bell icon - faBell - For notifications
export const NotifsIcon = () => {
    return <span className="notifs-icon">
        <FontAwesomeIcon icon={faBell} />
    </span>;
}

// Cog icon - faCog - For settings
export const Settings = ({ user }) => {
    const [show, setShow] = useState(false);
    const [lightMode, setLightMode] = useState(user.settings.light_mode);

    const handleCogClick = () => {
        setShow(!show);
    }

    const handleModeToggle = () => {
        console.log('toggle light/dark mode');

        setLightMode(!lightMode);

        if (lightMode) {
            document.body.classList.add('darkMode');
            document.body.classList.remove('lightMode');
        }
        else {
            document.body.classList.add('lightMode');
            document.body.classList.remove('darkMode');
        }

        setShow(false);

        axios.post('/api/settings', {
            lightMode: !lightMode
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return <span className="settings">
        <FontAwesomeIcon icon={faCog} onClick={handleCogClick} />
        {show && <menu className="settings-menu">
            <ul>
                <li>
                    <button type="button" onClick={handleModeToggle}>
                        Toggle Light/Dark Mode
                    </button>
                </li>
                <li><Link href="/logout">Log Out</Link></li>
            </ul>
        </menu>}
    </span>;
}
