"use client";

import { useState } from 'react'; // Notifs/settings menus open on click; (On nav right) mobile hamburger vs open menu links vs nav bar; Mobile logo centered vs on left; Signed in or not; Admin or not; search open or not
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBell,
    faCheck,
    faCog,
    faComments,
    faCopy,
    faEnvelope,
    faExclamationTriangle,
    faHouseLock,
    faMusic,
    faSearch,
    faSpinner,
    faTimesCircle,
    faUpload,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { apiURL } from "@/app/lib/general_variables";

interface User {
    settings?: {
        light_mode?: boolean;
    };
}

// Show a Note Modal;

// Times circle icon - faTimesCircle - For closing
export default function CloseIcon() {
    return <span className="close-icon">
        <FontAwesomeIcon icon={faTimesCircle} />
    </span>;
};

// Copy icon - faCopy - For copying pw
export const CopyIcon = () => {
    return <span className="copy-icon">
        <FontAwesomeIcon icon={faCopy} />
    </span>;
};

// Envelope icon - faEnvelope - For emails
export const EmailIcon = () => {
    return <span className="email-icon">
        <FontAwesomeIcon icon={faEnvelope} />
    </span>;
};

// Exclamation triangle icon - faExclamationTriangle - For errors
export const ErrorIcon = () => {
    return <span className="error-icon">
        <FontAwesomeIcon icon={faExclamationTriangle} />
    </span>;
};

// Spinner icon - faSpinner - For loading
export const LoadingIcon = () => {
    return <span className="loading-icon">
        <FontAwesomeIcon icon={faSpinner} />
    </span>;
};

// Music icon - faMusic - For media
export const MediaIcon = () => {
    return <span className="media-icon">
        <FontAwesomeIcon icon={faMusic} />
    </span>;
};

// Hamburger icon - faBars - For mobile menu
export const MobileIcon = () => {
    return <span className="mobile-icon">
        <FontAwesomeIcon icon={faBars} />
    </span>;
};

// Comments icon - faComments - For notes
export const NotesIcon = () => {
    return <span className="notes-icon">
        <FontAwesomeIcon icon={faComments} />
    </span>;
};

// Bell icon - faBell - For notifications
// TODO The <sup> tag defines superscript text.
export const NotifsIcon = ({ className, notifCount }: { className: string; notifCount?: number | null | undefined }) => {
    return <span className="notifs-icon">
        <FontAwesomeIcon icon={faBell} />
        {
            notifCount ? <span className="redNotifsCountPlacement">
                {notifCount}
            </span> : null
        }
    </span>;
};

// Search icon - faSearch - For search
export const SearchIcon = ({ isClicked, className }: { isClicked: boolean, className: string }) => {
    return <span className={className}>
        {isClicked ? <span>Enter</span> : <FontAwesomeIcon icon={faSearch} className="searchFieldIcon" />}
    </span>;
};

// House lock icon faHouseLock - For sending a pw/media list
export const SendPWIcon = ({className}: {className: string}) => {
    return <span className={className}>
        <FontAwesomeIcon icon={faHouseLock} />
    </span>;
};

// Cog icon - faCog - For settings
// Define a type for the user prop
export const SettingsIcon = ({ user, className }: { user: User, className: string }) => {
    const [show, setShow] = useState(false);
    const [lightMode, setLightMode] = useState(user?.settings?.light_mode);

    const handleCogClick = () => {
        setShow(prev => !prev);
    };

    const handleModeToggle = () => {
        console.log('toggle light/dark mode');

        setLightMode(prev => !prev);

        // Complete later - TODO
        // if (lightMode) {
        //     document.body.classList.add('darkMode');
        //     document.body.classList.remove('lightMode');
        // }
        // else {
        //     document.body.classList.add('lightMode');
        //     document.body.classList.remove('darkMode');
        // }

        setShow(false);

        axios.post('/settings', {
            lightMode: !lightMode
        })
            .then((res) => {
                console.log({ res });
            })
            .catch((err) => {
                console.log({ err });
            });
    };

    return <span className={className}>
        <FontAwesomeIcon icon={faCog} onClick={handleCogClick} />
        {show && <menu className="settings-menu">
            <ul>
                <li>
                    <button type="button" onClick={handleModeToggle}>
                        Toggle Light/Dark Mode
                    </button>
                </li>
                <li><Link href={apiURL + "/signout"}>Sign Out</Link></li>
            </ul>
        </menu>}
    </span>;
};

// Check icon - faCheck - For successful actions
export const SuccessIcon = () => {
    return <span className="success-icon">
        <FontAwesomeIcon icon={faCheck} />
    </span>;
};

// Upload icon - faUpload - For uploading new media
export const UploadIcon = () => {
    return <span className="upload-icon">
        <FontAwesomeIcon icon={faUpload} />
    </span>;
};

// User icon - faUsers - For users
export const UsersIcon = () => {
    return <span className="users-icon">
        <FontAwesomeIcon icon={faUsers} />
    </span>;
};
