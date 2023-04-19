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
    /users/:user - username, role, lastLogin, notes, media, created, reset pw link, delete user link
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
import logo from '../public/logo192.png';
