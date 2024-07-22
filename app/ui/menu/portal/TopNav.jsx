"use client";

import { useState } from "react";
import Link from "next/link";

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
} from "../NavLinks";
import SearchResults from "@/app/ui/SearchResults";
import { GeneralToast } from "../../credentials/Toast";

// Going to have to retrieve the notifs count and display the number
// On click, it opens a popup of the notifs with each item's count, its small title and a link
// Going to have to create a popup to show the settings values
// and radios to change them
export default function TopNav({ userInfo = { type: "client" } }) {
    const [clicked, setClicked] = useState(false);
    const [searchEntry, setSearchEntry] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

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

    const handleNotifs = () => {

    };

    const handleSettings = () => {

    };

    const AdminNav = () => {
        return <div className="adminNavLinks">
            <Link href={baseURL + "/account/new"}>
                <SendPWIcon /> &nbsp;

                <span>Send PW</span>
            </Link>

            <Link href={baseURL + "/media/new"}>
                <UploadIcon /> &nbsp;

                <span>Upload</span>
            </Link>

            <form id="topNavSearchForm">
                <button type="submit" onClick={handleSearchClick}>
                    <SearchIcon isClicked={clicked} />
                </button> &nbsp;

                <label htmlFor="searchField" style={{ display: "none" }}>Search</label>
                <input
                    type="text"
                    name="searchField"
                    id="searchField"
                    value={searchEntry}
                    onChange={(e) => { setSearchEntry(e.target.value); }}
                    style={{ display: "none" }}
                />
            </form>

            <Link href={baseURL + "/media/all"}>
                <MediaIcon /> &nbsp;

                <span>Media</span>
            </Link>

            <Link href={baseURL + "/notes"}>
                <NotesIcon /> &nbsp;

                <span>Notes</span>
            </Link>

            <Link href={baseURL + "/account/all"}>
                <UsersIcon /> &nbsp;

                <span>Users</span>
            </Link>

            <button type="button" onClick={handleNotifs}>
                <NotifsIcon /> &nbsp;

                <span>Notifs</span>
            </button>

            <button type="button" onClick={handleSettings}>
                <SettingsIcon user={weGotAUser} /> &nbsp;

                <span>Settings</span>
            </button>
        </div>;
    };

    const ClientNav = () => {
        const { data: session, status } = { data: "client", status: "authenticated" }; //useSession();

        const weGotAUser = session && session.user ? session.user : false;
        const weGotAnAdmin = weGotAUser && session.user.role === "admin";
        const weGotAnEmail = weGotAUser && session.user.email ? session.user.email : false;

        return <div className="userNavLinks">
            <Link href={baseURL + "/media"}>
                <MediaIcon /> &nbsp;

                <span>Media</span>
            </Link>

            <Link href={baseURL + "/notes"}>
                <NotesIcon /> &nbsp;

                <span>Notes</span>
            </Link>

            <Link href={baseURL + "/contact"}>
                <EmailIcon /> &nbsp;

                <span>Contact</span>
            </Link>

            <button type="button" onClick={handleNotifs}>
                <NotifsIcon /> &nbsp;

                <span>Notifs</span>
            </button>

            <button type="button" onClick={handleSettings}>
                <SettingsIcon user={weGotAUser} /> &nbsp;

                <span>Settings</span>
            </button>
        </div>;
    };

    return <div>
        <GeneralToast message={toastMessage} />

        {userInfo.type === "admin" ? <AdminNav /> : <ClientNav />}

        <SearchResults showSection={!clicked} />
    </div>;
};
