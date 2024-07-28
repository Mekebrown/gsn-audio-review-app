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
import { baseURL, apiURL, GSNLogo } from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

/** 
All top nav-related click events will have to stay together in this element since they're all related to the top nav. Breaking the components apart creates state issues. Will handle in a future TODO refactoring
Going to have to retrieve the notifs count and display the number
On click, it opens a popup of the notifs with each item's count, its small title and a link
Going to have to create a popup to show the settings values
and radios to change them
*/
export default function TopNav() {
    const [showSignedInMenu, setShowSignedInMenu] = useState("client");
    const [clicked, setClicked] = useState(false);
    const [newNotifs, setNewNotifs] = useState({ media: 0, notes: 0, signins: 0 });
    const [searchEntry, setSearchEntry] = useState("");

    // Open a dropdown menu to show notifications (client: new media, new notes; admin: new notes, new signins)
    const handleNotifs = () => { };
    const handleSettings = () => { };

    const handleSearchClick = (e) => {
        e.preventDefault();

        if (searchEntry !== "") {
            const response = fetch(apiURL + "/info/search", { method: "GET", body: { "search_query": searchEntry } });

            if (response.okay) {
                setToastMessage("Search successful");
            } else {
                setToastMessage("Not searched for, sorry");
            }

            setSearchEntry("");
        }

        setClicked(prev => !prev);
    };

    const GeneralNav = () => {
        return <div className="topNavSection">
            <Link href={baseURL + "/about"}>About</Link> &nbsp;
            <Link href={baseURL + "/about/ntks/pricing"}>Pricing</Link> &nbsp;
            <Link href={baseURL + "/contact"}>Contact</Link> &nbsp;| &nbsp;
            <Link href={baseURL + "/signin"}>Sign In</Link>
        </div>;
    };

    const AdminNav = () => {
        return <div className="adminNavLinks topNavSection">
            <Link className="unpwIconLink" href={baseURL + "/account/new"}>
                <div className="tooltip">
                    <SendPWIcon className="unpwIcon" />

                    <span className="tooltiptext">
                        Invite a user by sending them a username and password
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
            <form className="searchIconForm" id="topNavSearchForm">
                <button type="submit" onClick={handleSearchClick}>
                    <SearchIcon className="searchIcon" isClicked={clicked} />
                </button>

                <label className="searchFieldEl" htmlFor="searchField">Search</label>
                <input
                    type="text"
                    name="searchField"
                    id="searchField"
                    className="searchFieldEl"
                    value={searchEntry}
                    onChange={(e) => { setSearchEntry(e.target.value); }}
                />
            </form>
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
            <Link className="usersIconLink" href={baseURL + "/account/all"}>
                <div className="tooltip">
                    <UsersIcon className="usersIcon" />

                    <span className="tooltiptext">Users</span>
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
        </div>;
    };

    const ClientNav = () => {
        return <div className="clientNavLinks topNavSection">
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
        </div>;
    };

    const CurrentNav = () => {
        switch (showSignedInMenu) {
            case "client":
                return <ClientNav />;
            case "admin":
                return <AdminNav />;
            default:
                return <GeneralNav />;
        }
    };

    /**
     * Sends a sign-in cookie and JWT header with the request. 
     * Perhaps use useSession and session data retrieval?
     * 
     * Call to see if user is signed in
     */
    useEffect(() => {
        const retrieveNotifURL = apiURL + "/users/";
        const signInCookie = getCookie('gsn-sign-in-cookie');
        const jwtInfo = "";

        if (signInCookie && jwtInfo) { // User's signed in? Get notifs
            const grabNotifs = async () => {
                const response = await axios(
                    retrieveNotifURL,
                    {
                        method: "POST",
                        headers: {
                            jwtInfo
                        },
                        body: signInCookie
                    }
                );

                return notifResponse;
            };

            const data = grabNotifs();

            if (data.ok === true) {
                setNewNotifs(data.new_notifs);
                setShowSignedInMenu(data.user_type);
            }
        }
    }, []);

    return <header>
        <nav>
            <menu className="topNav">
                <div className="topNavSection">
                    <Link href={baseURL} >
                        <GSNLogo />
                        <span>Gifted Sounds Network</span>
                    </Link>
                </div>

                <div className="topNavSection"></div>

                <CurrentNav />
            </menu>
        </nav>

        {/* Has to be a modal */}
        <SearchResults showSection={!clicked} />
    </header>;
};
