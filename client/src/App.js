import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { 
  adminIndvlViewinglePath,
  indexPath, 
  userSingleMediaPath,
  userPath, 
  uploadMediaPath,
  adminIndvlNote,
  mediaId,
  adminShowAllUsers,
  adminPath 
} from "./components/tools/vars";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";
import Home from "./components/Home";
import AllProjects from "./components/Admin/AllProjects";
import logo from "./components/tools/logo.png";

import styles from "./App.css";
import classNames from "classnames/bind";

import AdminSingleProject from "./components/Admin/AdminSingleProject";
import AdminSingleNote from "./components/Admin/AdminSingleNote";
import ShowAllUsers from "./components/Admin/ShowAllUsers";
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

            <section>
                <i className="fa fa-upload"></i>{' '}
                <Link to={uploadMediaPath}>Upload</Link>
                {' '} &nbsp; {' '} &nbsp; 
                <i className="fa fa-search"></i>
                <input className={searchBarInput} type="text" id="searchBar" title="searchBar" name="searchBar" placeholder="" />
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/">                  
                  <i className="fa fa-user"></i>
                  Username
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/">
                  <i className="fa fa-cog"></i>
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/">
                  <i className="fa fa-comments"></i>
                </Link>
                {' '} &nbsp; {' '} &nbsp; 
                <Link to="/">
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
        <Link to={adminShowAllUsers}>Admin - All Users</Link><br /><br />{/** /admin/users */}
        
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
              <Route path={adminPath} element={ <AllProjects />} />
              <Route path={uploadMediaPath} element={ <UploadMedia />} />
              <Route path={`${adminIndvlNote}/${mediaId}`} element={ <AdminSingleNote /> } />
              <Route path={`${adminIndvlViewinglePath}/${mediaId}`} element={ <AdminSingleProject /> } />
              <Route path={adminShowAllUsers} element={ <ShowAllUsers /> } />

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
