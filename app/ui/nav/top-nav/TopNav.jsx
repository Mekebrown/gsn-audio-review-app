"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from 'cookies-next';

import {
    EmailIcon,
    MediaIcon,
    NotesIcon,
    UsersIcon,
    NotifsIcon,
    SearchIcon,
    SendPWIcon,
    SettingsIcon,
    UploadIcon
} from "@/app/ui/nav/NavLinks";
import SearchResults from "@/app/ui/SearchResults";
import {
    baseURL,
    GSNLogo,
    searchAPIPath,
    gsnSignInCookie,
    notifsAPIPath
} from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

/**
 * @description The site navigation showing one of three versions of 
 * navigation menus, depending on the member and credentials
 * This component includes 
 * - A visitor's nav showing About, Pricing, Contact, and Sign In page links
 * - A client's nav showing Media, Notes, Contact, pages 
 *      as well as the notifications, and settings menus
 * - An admin's nav showing unpw, upload, search, all media/notes/members
 *      as well as the notifications, and settings menus
 * - A search input that returns results in a modal
 * - The dropdown meny revealing notifications
 * - The dropdown meny revealing settings
 * 
 * All top nav-related click events will have to stay together in this 
 * element since they're all related to the top nav. Breaking the 
 * components apart creates state issues. Will handle in a future TODO 
 * refactoring
 * 
 * Going to have to retrieve the notifs count and display the number. 
 * On click, it opens a popup of the notifs with each item's count, 
 * its small title and a link. 
 * Going to have to create a popup to show the settings values 
 * and radios to change them
 * 
 * Open a dropdown menu to show notifications (client: new media, 
 * new notes; admin: new notes, new signins)
 * 
 * @returns {JSX.Element} <TopNav />
 */
export default function TopNav() {
    const [memberId, setMemberId] = useState(null);
    const [showSignedInMenu, setShowSignedInMenu] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [newNotifs, setNewNotifs] = useState({ media: 0, notes: 0, signins: 0 });
    const [searchEntry, setSearchEntry] = useState("");

    const handleNotifs = () => { };
    const handleSettings = () => { };

    const handleSearchClick = async (e) => {
        e.preventDefault();

        if (searchEntry !== "") {
            const response = await fetch(searchAPIPath + searchEntry);

            if (response.okay) {
                const resJSON = await response.json();
                const { data } = resJSON;

                setToastMessage("Search successful");
            } else {
                setToastMessage("Not searched for, sorry");
            }

            setSearchEntry("");
        }

        setClicked(prev => !prev);
    };

    const ClientNav = () => {
        return <header className="portal">
            <nav>
                <menu className="topNav">
                    <div className="topNavSection">
                        <Link href={baseURL} >
                            <GSNLogo />

                            <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                        </Link>
                    </div>

                    <div className="topNavSection"></div>

                    <div className="clientNavLinks topNavSection rightLinks">
                        <Link className="mediaIconLink" href={baseURL + "/media"}>
                            <div className="tooltip">
                                <MediaIcon className="mediaIcon" />

                                <span className="tooltiptext"> Media</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="notesIconLink" href={baseURL + "/notes"}>
                            <div className="tooltip">
                                <NotesIcon className="notesIcon" />

                                <span className="tooltiptext">Notes</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="contactIconLink" href={baseURL + "/contact"}>
                            <div className="tooltip">
                                <EmailIcon className="contactIcon" />

                                <span className="tooltiptext">Contact</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <button className="notifsIconBtn" type="button" onClick={handleNotifs}>
                            <div className="tooltip">
                                <NotifsIcon
                                    className="notifsIcon"
                                    notifCount={newNotifs.media + newNotifs.notes}
                                />

                                <select className="hideOption notifsDropdown">
                                    <option>View {newNotifs.media} new tracks</option>
                                    <option>View {newNotifs.notes} new notes</option>
                                </select>

                                <span className="tooltiptext">
                                    {newNotifs.signins} new tracks,
                                    {newNotifs.notes} new notes
                                </span>
                            </div>
                        </button>
                        &nbsp;|&nbsp;
                        <button className="settingsIconBtn" type="button" onClick={handleSettings}>
                            <div className="tooltip">
                                <SettingsIcon
                                    className="settingsIcon"
                                    user="WeGot AUser"
                                />

                                <select className="hideOption settingsDropdown">
                                    <option>Light/dark mode</option>
                                    <option>Other</option>
                                </select>

                                <span className="tooltiptext">Settings</span>
                            </div>
                        </button>
                    </div>
                </menu>
            </nav>
        </header>;
    };

    const AdminNav = () => {
        return <header className="portal">
            <nav>
                <menu className="topNav">
                    <div className="topNavSection">
                        <Link href={baseURL} >
                            <GSNLogo />

                            <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                        </Link>
                    </div>

                    <div className="topNavSection"></div>

                    <div className="adminNavLinks topNavSection rightLinks">
                        <Link className="unpwIconLink" href={baseURL + "/account/new"}>
                            <div className="tooltip">
                                <SendPWIcon className="unpwIcon" />

                                <span className="tooltiptext">
                                    Invite a member by sending them a username and password
                                </span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="uploadIconLink" href={baseURL + "/media/new"}>
                            <div className="tooltip">
                                <UploadIcon className="uploadIcon" />

                                <span className="tooltiptext">Upload</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        {/*
                        <search>
                            <form className="searchIconForm" id="topNavSearchForm">
                                <button type="submit" onClick={handleSearchClick}>
                                    <SearchIcon className="searchIcon" isClicked={clicked} />
                                </button>

                                <label className="searchFieldEl" htmlFor="searchField">Search</label>
                                <input
                                    type="text"
                                    id="searchField"
                                    className="searchFieldEl"
                                    value={searchEntry}
                                    onChange={(e) => { setSearchEntry(e.target.value); }}
                                />
                            </form>
                        </search>
                        &nbsp;|&nbsp;*/}
                        <Link className="mediaIconLink" href={baseURL + "/media/all"} >
                            <div className="tooltip">
                                <MediaIcon className="mediaIcon" />

                                <span className="tooltiptext">Media</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="notesIconLink" href={baseURL + "/notes"}>
                            <div className="tooltip">
                                <NotesIcon className="notesIcon" />

                                <span className="tooltiptext">Notes</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <Link className="membersIconLink" href={baseURL + "/account/all"}>
                            <div className="tooltip">
                                <UsersIcon className="UsersIcon" />

                                <span className="tooltiptext">Members</span>
                            </div>
                        </Link>
                        &nbsp;|&nbsp;
                        <button className="notifsIconBtn" type="button" onClick={handleNotifs}>
                            <div className="tooltip">
                                <NotifsIcon
                                    className="notifsIcon"
                                    notifCount={newNotifs.signins + newNotifs.notes}
                                />

                                <select className="hideOption notifsDropdown">
                                    <option>View {newNotifs.signins} new signins</option>
                                    <option>View {newNotifs.notes} new notes</option>
                                </select>

                                <span className="tooltiptext">
                                    {newNotifs.signins} new signins,
                                    {newNotifs.notes} new notes
                                </span>
                            </div>
                        </button>
                        &nbsp;|&nbsp;
                        <button className="settingsIconBtn" type="button" onClick={handleSettings}>
                            <div className="tooltip">
                                <SettingsIcon
                                    className="settingsIcon"
                                    user="WeGot AUser"
                                />

                                <select className="hideOption settingsDropdown">
                                    <option>Light/dark mode</option>
                                    <option>Other</option>
                                </select>

                                <span className="tooltiptext">Settings</span>
                            </div>
                        </button>
                    </div>
                </menu>
            </nav>
        </header>;
    };

    const CurrentNav = () => {
        if (showSignedInMenu === "client") {
            return <ClientNav />;
        } else if (showSignedInMenu === "admin") {
            return <AdminNav />;
        }
    };

    /**
     * Sends a sign-in cookie and JWT header with the request.
     * 
     * Call to see if member is signed in
     */
    useEffect(() => {
        const signInCookie = getCookie(gsnSignInCookie);
        const jwtInfo = "";

        /* 
        Retrieve current member's id
        .
        . 
        . 
        For now it's 1
        */
        setMemberId(1);

        if (signInCookie && jwtInfo) { // Member's signed in? Get notifs
            const grabNotifs = async () => {
                const response = await axios({
                    url: notifsAPIPath + memberId,
                    method: "POST",
                    headers: { jwtInfo },
                    data: signInCookie
                });

                const resJSON = await response.json();
                const { data } = resJSON;

                return data;
            };

            const data = grabNotifs();

            if (!data.error) {
                setNewNotifs(data.new_notifs);
                setShowSignedInMenu(data.member_type);
            }
        }
    }, []);

    return <>
        <CurrentNav />

        {/* Has to be a modal */}
        <SearchResults showSection={!clicked} />
    </>;
};
