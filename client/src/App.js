import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import adminInfoNotesPath, {
  adminUploadPath,
  adminSendDashPW,
  adminInfoUsersPath,
  allMediaPath,
  contactPath,
  indexPath,
  loginPath,
  noteId,
  mediaId,
  reviewerId
} from "./components/tools/vars";
import logo from "./components/tools/logo.png";
import Home from "./components/Home";
import AllMediaProjects from "./components/General/AllMediaProjects/AllMediaProjects";
import SingleMediaProject from "./components/General/SingleMediaProject/SingleMediaProject";
import AdminSingleNote from "./components/Admin/Modals/AdminSingleNote";
import AdminShowAllUsers from "./components/Admin/AdminShowAllUsers";
import AdminUploadMedia from "./components/Admin/AdminUploadMedia";
import AdminSendPW from "./components/Admin/Modals/AdminSendPW";
import AdminShowSingleUser from "./components/Admin/Modals/AdminShowSingleUser";
import AdminShowAllNotes from "./components/Admin/AdminShowAllNotes";
import ContactForm from "./components/General/ContactForm";
import styles from "./App.css";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userRoute, setUserRoute] = useState("/");
  const [isSingleNoteModalOpen, setIsSingleNoteModalOpen] = useState(false);
  const [isSingleUserOpen, setIsSingleUserOpen] = useState(false);
  const [isSendPWOpen, setIsSendPWOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  let cx = classNames.bind(styles);
  let topBarMenu = cx({ loggedIn: userId, loggedOut: !userId });
  let topBarLogo = cx({ topBarSections: userId });
  let imgMiddleAlign = cx({ imgMiddleAlign: true });
  let topBarLinksCont = cx({ hideOption: !userId, topBarSections: userId, topBarRightAlign: userId });
  let topBarLinks = cx({ displayInline: userId, rightSection: userId, hideOption: userRoute === "/review" });
  let searchBarInput = cx({ hideOption: userId });
  let linksSection = cx({ hideOption: !userId });
  let contactGSN = cx({ hideOption: !userId || userRoute === "/admin" });

  if (document.getElementById("splasher")) {
    document.body.removeChild(document.getElementById("splasher"));
  }

  useEffect(() => {
    if (!userId) {
      axios.get("/api/is-authenticated")
        .then((res) => {
          if (res.status === 200) {
            setUserId(res.data.user_id);
            setUserRoute(res.data.route);
          }
        })
        .catch(() => /* do nothing*/ { });
    }
  }, []);

  return (
    <Router>
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
        <Link to={`${allMediaPath}/${mediaId}`}>Admin - Single Media Information</Link><br /> {/** /admin/retrieve-info/media/media_id */}
        <Link to={`${adminInfoNotesPath}/${noteId}`} onClick={() => setIsSingleNoteModalOpen(true)}>Admin - Show individual note</Link><br /> {/** /admin/review-info/note/:note_id */}
        <Link to={adminUploadPath}>Admin - Upload Media</Link><br /> {/** /review/add-media */}
        <Link to={adminSendDashPW} onClick={() => setIsSendPWOpen(true)}>Admin - Send A Password</Link><br />{/**  */}
        <Link to={adminInfoUsersPath}>Admin - All Users</Link><br />{/** /admin/users */}
        <Link to={`${adminInfoUsersPath}/${reviewerId}`} onClick={() => setIsSingleUserOpen(true)}>Admin - Show Single User</Link><br /> {/** /admin/retrieve-info/user */}
        <Link to={adminInfoNotesPath}>Admin - Show All Notes</Link><br /><br />{/** /admin/users */}

        {userId && <Link to="/api/logout">Log out</Link>}
      </div>

      <main>
        <Routes>
          <Route exact path={loginPath} element={<Home route={userRoute} />} />
          {/* AudioPlayerOnly to be used inside of AllProjects and SingleMediaProject components */}
          {/* Notes to be used inside of AllProjects and SingleMediaProject components */}
          {/* AudioPlayerAndControls to be used inside of UserSingleProject component */}
          {/* NoteTaker to be used inside of UserSingleProject component */}

          {/* ADMIN'S ROUTES */}
          <Route path={`${allMediaPath}/${mediaId}`} element={<SingleMediaProject mediaId={mediaId} />} />
          <Route path={`${adminInfoNotesPath}/${noteId}`} element={<AdminSingleNote noteId={noteId} open={isSingleNoteModalOpen} onClose={() => { setIsSingleNoteModalOpen(false); }} />} />
          <Route path={adminUploadPath} element={<AdminUploadMedia />} />
          <Route path={adminSendDashPW} element={<AdminSendPW open={isSendPWOpen} onClose={() => { setIsSendPWOpen(false); }} />} />
          <Route path={adminInfoUsersPath} element={<AdminShowAllUsers />} />
          <Route path={`${adminInfoUsersPath}/${reviewerId}`} element={<AdminShowSingleUser userId={reviewerId} open={isSingleUserOpen} onClose={() => { setIsSingleUserOpen(false); }} />} />
          <Route path={adminInfoNotesPath} element={<AdminShowAllNotes />} />

          {/* USER'S REVIEWER ROUTES */}
          <Route path={contactPath} element={<ContactForm open={isContactModalOpen} onClose={() => { setIsContactModalOpen(false); }} />} />

          {/* FALLBACK */}
          <Route path="/*" element={<Home route={userRoute} />} />
        </Routes>

        <Link to={contactPath} className={contactGSN} onClick={() => setIsContactModalOpen(true)} title="contact-icon">
          <i className="fa fa-envelope contactIcon"></i>
        </Link>
      </main>

      <footer>
        <strong>GSN Audio Review App</strong>
        {/*<!-- Social media links -->*/}
      </footer>
    </Router>
  );
};

export default App;
