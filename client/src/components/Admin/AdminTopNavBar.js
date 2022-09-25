import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { useAuth } from "../tools/user-context/UserGlobalContextProvider";

import adminInfoNotesPath, {
    adminInfoUsersPath,
    adminSendDashPW,
    adminUploadPath,
    allMediaPath,
    indexPath,
    mediaId,
    noteId,
    reviewerId
} from "../tools/vars";
import logo from "../tools/logo.png";
import styles from "./AdminTopNavBar.css";

/**
 * @returns {Node} AdminTopNavBar
 */
const AdminTopNavBar = () => {
    const { user } = useAuth();

    const [isSingleNoteModalOpen, setIsSingleNoteModalOpen] = useState(false);
    const [isSingleUserOpen, setIsSingleUserOpen] = useState(false);
    const [isSendPWOpen, setIsSendPWOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    let cx = classNames.bind(styles);
    let topBarMenu = cx({ loggedIn: user.user_id, loggedOut: !user.user_id });
    let topBarLogo = cx({ topBarSections: user.user_id });
    let imgMiddleAlign = cx({ imgMiddleAlign: true });
    let topBarLinksCont = cx({ hideOption: !user.user_id || !user.user_role, topBarSections: user.user_id, topBarRightAlign: user.user_id });
    let topBarLinks = cx({ displayInline: user.user_id, rightSection: user.user_id, hideOption: user.user_role === "reviewer" });
    let searchBarInput = cx({ hideOption: user.user_id });
    let linksSection = cx({ hideOption: !user.user_id });

    return (<>
        <header>
            <nav>
                <menu className={topBarMenu}>
                    {/* Top bar when not logged in*/}
                    <section className={topBarLogo}>
                        <Link to={indexPath} className={topBarLogo}>
                            <img src={logo} className={imgMiddleAlign} alt="Gifted Sounds Network logo" />
                            {' '}
                            <span>GIFTED SOUNDS</span>
                        </Link>
                    </section>

                    {/* Top bar when logged in; Above logo pushed to the left */}
                    <section className={topBarLinksCont}>
                        <Link to={adminUploadPath} className={topBarLinks}>
                            <i className="fa fa-upload"></i>{' '}
                            Upload
                        </Link>
                        {' '} &nbsp; {' '} &nbsp;

                        <i className={`fa fa-search ${topBarLinks}`}></i>
                        <input
                            className={`${searchBarInput} ${topBarLinks}`}
                            type="text"
                            id="searchBar"
                            title="searchBar"
                            name="searchBar"
                            placeholder=""
                        />
                        {' '} &nbsp; {' '} &nbsp;

                        <Link to={indexPath} className={topBarLinks}>
                            <i className="fa fa-user"></i>
                            Username
                        </Link>
                        {' '} &nbsp; {' '} &nbsp;

                        <Link to={indexPath} className={topBarLinks}>
                            <i className="fa fa-cog"></i>
                        </Link>
                        {' '} &nbsp; {' '} &nbsp;

                        <Link to={indexPath} className={topBarLinks}>
                            <i className="fa fa-comments"></i>
                        </Link>
                        {' '} &nbsp; {' '} &nbsp;

                        <Link to={indexPath} className={topBarLinks}>
                            <i className="fa fa-bell"></i>
                        </Link>
                    </section>
                </menu>
            </nav>
        </header>

        <div className={linksSection}>
            <Link to={`${allMediaPath}/${mediaId}`}>Admin - Single Media Information</Link><br />
            <Link to={`${adminInfoNotesPath}/${noteId}`} onClick={() => setIsSingleNoteModalOpen(true)}>Admin - Show individual note</Link><br />
            <Link to={adminUploadPath}>Admin - Upload Media</Link><br />
            <Link to={adminSendDashPW} onClick={() => setIsSendPWOpen(true)}>Admin - Send A Password</Link><br />
            <Link to={adminInfoUsersPath}>Admin - All Users</Link><br />
            <Link to={`${adminInfoUsersPath}/${reviewerId}`} onClick={() => setIsSingleUserOpen(true)}>Admin - Show Single User</Link><br />
            <Link to={adminInfoNotesPath}>Admin - Show All Notes</Link><br /><br />

            {user !== {} && <Link to="/logout">Log out</Link>}
        </div>
    </>);
};

export default AdminTopNavBar;
