import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import logo from "./components/tools/logo.png";
import {
  indexPath,
  adminPath,
  adminInfoMediaPath,
  adminUploadPath,
  adminSendDashPW,
  adminInfoUsersPath,
  adminInfoNotesPath,
  reviewerPath,
  mediaId,
  reviewerId,
  noteId
} from "./components/tools/vars";

import styles from "./App.css";
import classNames from "classnames/bind";

import Home from "./components/Home";

import AdminShowAllProjects from "./components/Admin/AdminShowAllProjects";
import AdminSingleProject from "./components/Admin/AdminSingleProject";
import AdminSingleNote from "./components/Admin/Modals/AdminSingleNote";
import AdminShowAllUsers from "./components/Admin/AdminShowAllUsers";
import AdminUploadMedia from "./components/Admin/AdminUploadMedia";
import AdminSendPW from "./components/Admin/Modals/AdminSendPW";
import AdminShowSingleUser from "./components/Admin/Modals/AdminShowSingleUser";
import AdminShowAllNotes from "./components/Admin/AdminShowAllNotes";

import UserSingleProject from "./components/User/UserSingleProject";
import UserAllMediaToReview from "./components/User/UserAllMediaToReview";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isSingleNoteModalOpen, setIsSingleNoteModalOpen] = useState(false);
  const [isSingleUserOpen, setIsSingleUserOpen] = useState(false);
  const [isSendPWOpen, setIsSendPWOpen] = useState(false);

  let cx = classNames.bind(styles);
  let topBarOverallCont = cx({ loggedIn: userId, loggedOut: !userId });
  let topBarLogoCont = cx({ topBarSection: userId });
  let topBarLinksCont = cx({ hideOption: !userId });
  let topBarLinks = cx({ displayInline: userId, rightSection: userId });
  let searchBarInput = cx({ hideOption: userId });


  if (document.getElementById("splasher")) {
    document.body.removeChild(document.getElementById("splasher"));
  }

  return (
    <Router>
      <header>
        <nav>
          <menu className={topBarOverallCont}>
            <section className={topBarLogoCont}>
              <li>
                <Link to={indexPath} className="topBarLogo">
                  <img src={logo} alt="Gifted Sounds Network logo" />
                  <span>GIFTED SOUNDS</span>
                </Link>
              </li>
            </section>

            <section className={topBarLinksCont}>
              <i className="fa fa-upload"></i>{' '}
              <Link to={adminUploadPath} className={topBarLinks}>Upload</Link>
              {' '} &nbsp; {' '} &nbsp;
              <i className="fa fa-search"></i>
              <input className={`${searchBarInput} ${topBarLinksCont}`} type="text" id="searchBar" title="searchBar" name="searchBar" placeholder="" />
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

      <div>
        {/* Temporary, for testing */}
        <Link to={adminPath}>Admin - All Projects</Link><br />{/** /admin */}
        {/* Temporary, for testing */}

        <Link to={`${adminInfoMediaPath}/${mediaId}`}>Admin - Single Media Information</Link><br /> {/** /admin/retrieve-info/media/media_id */}
        <Link to={`${adminInfoNotesPath}/${noteId}`} onClick={() => setIsSingleNoteModalOpen(true)}>Admin - Show individual note</Link><br /> {/** /admin/review-info/note/:note_id */}
        <Link to={adminUploadPath}>Admin - Upload Media</Link><br /> {/** /review/add-media */}
        <Link to={adminSendDashPW} onClick={() => setIsSendPWOpen(true)}>Admin - Send A Password</Link><br />{/**  */}
        <Link to={adminInfoUsersPath}>Admin - All Users</Link><br />{/** /admin/users */}
        <Link to={`${adminInfoUsersPath}/${reviewerId}`} onClick={() => setIsSingleUserOpen(true)}>Admin - Show Single User</Link><br /> {/** /admin/retrieve-info/user */}
        <Link to={adminInfoNotesPath}>Admin - Show All Notes</Link><br /><br />{/** /admin/users */}

        <Link to={reviewerPath}>User - All Media</Link><br /> {/** /review */}
        <Link to={`${reviewerPath}/${mediaId}`}>User - Single Media</Link><br /> {/** /review/:media_id */}
        <Link to="/logout">Log out</Link>
      </div>

      <main>
        <Routes>
          <Route exact path={indexPath} element={<Home />} />
          {/* AudioPlayerOnly to be used inside of AllProjects and AdminSingleProject components */}
          {/* Notes to be used inside of AllProjects and AdminSingleProject components */}
          {/* AudioPlayerAndControls to be used inside of UserSingleProject component */}
          {/* NoteTaker to be used inside of UserSingleProject component */}

          {/* ADMIN'S ROUTES */}
          {/* Temporary, for testing */}
          <Route path={adminPath} element={<AdminShowAllProjects />} />
          {/* Temporary, for testing */}

          <Route path={`${adminInfoMediaPath}/${mediaId}`} element={<AdminSingleProject mediaId={mediaId} />} />
          <Route path={`${adminInfoNotesPath}/${noteId}`} element={<AdminSingleNote noteId={noteId} open={isSingleNoteModalOpen} onClose={() => { setIsSingleNoteModalOpen(false); }} />} />
          <Route path={adminUploadPath} element={<AdminUploadMedia />} />
          <Route path={adminSendDashPW} element={<AdminSendPW open={isSendPWOpen} onClose={() => { setIsSendPWOpen(false); }} />} />
          <Route path={adminInfoUsersPath} element={<AdminShowAllUsers />} />
          <Route path={`${adminInfoUsersPath}/${reviewerId}`} element={<AdminShowSingleUser userId={reviewerId} open={isSingleUserOpen} onClose={() => { setIsSingleUserOpen(false); }} />} />
          <Route path={adminInfoNotesPath} element={<AdminShowAllNotes />} />

          {/* USER'S REVIEWER ROUTES */}
          <Route path={reviewerPath} element={<UserAllMediaToReview />} />
          <Route path={`${reviewerPath}/${mediaId}`} element={<UserSingleProject mediaId={mediaId} />} />

          {/* FALLBACK */}
          <Route path="/*" element={<Home />} />
        </Routes>
      </main>

      <footer>
        <strong>GSN Audio Review App</strong>
        {/*<!-- Social media links -->*/}
      </footer>
    </Router>
  );
};

export default App;
