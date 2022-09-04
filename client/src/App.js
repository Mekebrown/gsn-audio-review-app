import React, { useState, useMemo, useEffect } from "react";
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
  adminIndvlViewinglePath,
  adminIndvlNote,
  uploadMediaPath,
  adminSendPW,
  adminShowAllUsers,
  adminShowSingleUser,
  adminShowAllNotes,
  userPath,
  userSingleMediaPath,
  mediaId,
} from "./components/tools/vars";

import styles from "./App.css";
import classNames from "classnames/bind";

import Home from "./components/Home";

import AdminShowAllProjects from "./components/Admin/AdminShowAllProjects";
import AdminSingleProject from "./components/Admin/AdminSingleProject";
import AdminSingleNote from "./components/Admin/AdminSingleNote";
import AdminShowAllUsers from "./components/Admin/AdminShowAllUsers";
import UploadMedia from "./components/Admin/AdminUploadMedia";
import AdminSendPW from "./components/Admin/AdminSendPW";
import AdminShowSingleUser from "./components/Admin/AdminShowSingleUser";
import AdminShowAllNotes from "./components/Admin/AdminShowAllNotes";

import UserSingleProject from "./components/User/UserSingleProject";
import UserAllMediaToReview from "./components/User/UserAllMediaToReview";

import { UserLoginProvider } from "./UserLogin";

const App = () => {
  const [userId, setUserId] = useState(null);
  
  const providerValue = useMemo(() => ({userId, setUserId}), [userId, setUserId]);

  let cx = classNames.bind(styles);
  let topBarOverallCont = cx({ loggedIn: userId,   loggedOut: !userId });
  let topBarLogoCont = cx({ topBarSection: userId });
  let topBarLinksCont = cx({ hideOption: !userId });
  let topBarLinks = cx({ displayInline: userId,  rightSection: userId });
  let searchBarInput = cx({ hideOption: userId});

  useEffect(() => {
    let storedUserId = window.localStorage.getItem("userId");

    if (storedUserId && !userId) {
      setUserId(storedUserId);
    }
  }, []);

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
                <Link to={uploadMediaPath} className={topBarLinks}>Upload</Link>
                {' '} &nbsp; {' '} &nbsp; 
                <i className="fa fa-search"></i>
                <input className={`${searchBarInput} ${topBarLinksCont}`} type="text" id="searchBar" title="searchBar" name="searchBar" placeholder="" />
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/" className={topBarLinks}>                  
                  <i className="fa fa-user"></i>
                  Username
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/" className={topBarLinks}>
                  <i className="fa fa-cog"></i>
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/" className={topBarLinks}>
                  <i className="fa fa-comments"></i>
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/" className={topBarLinks}>
                  <i className="fa fa-bell"></i>
                </Link>
                <button onClick={() => {setUserId(null); window.localStorage.removeItem('userId')}}>Log Out</button>
            </section>
          </menu>
        </nav>
      </header>

      <div>
        <Link to={indexPath}>Login ID #{userId}</Link> { " "} <br /><br />

        <Link to={adminPath}>Admin - All Projects</Link><br />{/** /admin */}
        <Link to={adminIndvlViewinglePath}>Admin - Single Media Information</Link><br /> {/** /admin/retrieve-info/media/media_id */}
        <Link to={adminIndvlNote}>Admin - Show individual note</Link><br /> {/** /admin/review-info/note/:note_id */}
        <Link to={uploadMediaPath}>Admin - Upload Media</Link><br /> {/** /review/add-media */}
        <Link to={adminSendPW}>Admin - Send A Password</Link><br />{/**  */}
        <Link to={adminShowAllUsers}>Admin - All Users</Link><br />{/** /admin/users */}
        <Link to={adminShowSingleUser}>Admin - Show Single User</Link><br /> {/** /admin/retrieve-info/user */}
        <Link to={adminShowAllNotes}>Admin - Show All Notes</Link><br /><br />{/** /admin/users */}
        
        <Link to={userPath}>User - All Media to Review</Link><br /> {/** /review */}
        <Link to={userSingleMediaPath}>User - Single Media Note Page</Link><br /> {/** /review/:media_id */}
      </div>

      <main>
        <UserLoginProvider value={providerValue}>
          <Routes>
              {/* AudioPlayerOnly to be used inside of AllProjects and AdminSingleProject components */}
              {/* Notes to be used inside of AllProjects and AdminSingleProject components */}
              {/* AudioPlayerAndControls to be used inside of UserSingleProject component */}
              {/* NoteTaker to be used inside of UserSingleProject component */}
              <Route path={adminPath} element={ <AdminShowAllProjects />} />
              <Route path={`${adminIndvlViewinglePath}/${mediaId}`} element={ <AdminSingleProject /> } />
              <Route path={`${adminIndvlNote}/${mediaId}`} element={ <AdminSingleNote /> } />
              <Route path={uploadMediaPath} element={ <UploadMedia />} />
              <Route path={adminSendPW} element={ <AdminSendPW /> } />
              <Route path={adminShowAllUsers} element={ <AdminShowAllUsers /> } />
              <Route path={adminShowSingleUser} element={ <AdminShowSingleUser /> } />
              <Route path={adminShowAllNotes} element={ <AdminShowAllNotes /> } />

              <Route path={userPath} element={ <UserAllMediaToReview />} />
              <Route path={userSingleMediaPath} element={ <UserSingleProject mediaId={mediaId} />} />

              {/* All default routes */}
              <Route exact path={indexPath} element={ <Home /> } />
              <Route path="/*" element={ <Home />} />
          </Routes>
        </UserLoginProvider>
      </main>

      <footer>
        <strong>GSN Audio Review App</strong>
        {/*<!-- Social media links -->*/}
      </footer>
    </Router>
  );
}

export default App;
