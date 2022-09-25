import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { useAuth } from "../tools/user-context/UserGlobalContextProvider";
import { contactPath, indexPath } from "../tools/vars";
import logo from "../tools/logo.png";
import styles from "./ReviewerTopNavBar.css";

/**
 * @returns {Node} ReviewerTopNavBar
 */
const ReviewerTopNavBar = () => {
    const { user } = useAuth();

    let cx = classNames.bind(styles);
    let topBarMenu = cx({ loggedIn: user.user_id, loggedOut: !user.user_id });
    let topBarLogo = cx({ topBarSections: user.user_id });
    let imgMiddleAlign = cx({ imgMiddleAlign: true });
    let topBarLinksCont = cx({ hideOption: !user.user_id || !user.user_role, topBarSections: user.user_id, topBarRightAlign: user.user_id });
    let topBarLinks = cx({ displayInline: user.user_id, rightSection: user.user_id, hideOption: user.user_role === "reviewer" });
    let linksSection = cx({ hideOption: !user.user_id });
    let contactGSN = cx({ hideOption: !user.user_id || user.user_role === "admin" });

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
                        <Link to={indexPath} className={topBarLinks}>
                            <i className="fa fa-user"></i>
                            Username
                        </Link>
                    </section>
                </menu>
            </nav>
        </header>

        <div className={linksSection}>
            <Link to="/logout">Log out</Link>
            <Link to={contactPath} className={contactGSN} title="contact-icon"><i className="fa fa-envelope contactIcon"></i></Link>
        </div>
    </>);
};

export default ReviewerTopNavBar;
