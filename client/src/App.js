import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { 
  adminRetrieveSingleMediaInfo, 
  adminIndvlViewinglePath,
  indexPath, 
  userPath, 
  uploadMediaPath, 
  mediaId, 
  adminPath 
} from "./components/tools/vars";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import AllProjects from "./components/Admin/AllProjects";
import logo from "./components/tools/assets/logo.png";

import styles from "./App.css";
import classNames from "classnames/bind";

import AudioPlayerOnly from "./components/Admin/Sections/AudioPlayerOnly";
import AdminSingleProject from "./components/Admin/AdminSingleProject";
import Notes from "./components/Notes/Notes";
import AudioPlayerAndControls from "./components/User/Sections/AudioPlayerAndControls";
import NoteTaker from "./components/User/Sections/NoteTaker";
import Users from "./components/User/Users";
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
        <Link to={uploadMediaPath}>Admin - Upload Media</Link><br />
        <Link to={adminRetrieveSingleMediaInfo}>Admin - Single Media Information</Link><br /><br />
        <Link to={userPath}>User - Single Media Note Page</Link><br />
      </div>

      <main>
        <UserLoginProvider value={providerValue}>
          <Routes>
              <Route path={adminRetrieveSingleMediaInfo} element={ <Admin />} />
              <Route path={userPath} element={ <UserSingleProject mediaId={mediaId} />} />
              <Route path={uploadMediaPath} element={ <UploadMedia />} />
              <Route path={adminPath} element={ <AllProjects />} />

              <Route path="a" element={ <AudioPlayerOnly />} />
              <Route path={`${adminIndvlViewinglePath}/${mediaId}`} element={ <AdminSingleProject /> } />
              <Route path="c" element={ <UploadMedia />} />
              <Route path="d" element={ <AllProjects />} />    
              <Route path="e" element={ <Notes />} />
              <Route path="f" element={ <AudioPlayerAndControls />} />
              <Route path="g" element={ <NoteTaker />} />
              <Route path="h" element={ <Users />} />

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
