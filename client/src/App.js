import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import styles from './App.css';
import { indexPath, singleMediaPath, uploadMediaPath, mediaId, adminPath } from "./components/tools/vars";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";
import Home from "./components/Home";
import AllProjects from "./components/Admin/AllProjects";
import { UserContext } from "./components/tools/helper_functions";
import classNames from 'classnames/bind';
import logo from "./components/tools/assets/logo.png";

const App = () => {
  const [userId, setUserId] = useState(null);
  
  const providerValue = useMemo(() => ({userId, setUserId}), [userId, setUserId]);

  let cx = classNames.bind(styles);
  let classNameEntries = cx({ topBarLogo: true, loggedIn: userId, loggedOut: !userId, mobile: false });
  let loggedInClassNameEntries = cx({ hideOption: !userId, rightSection: true });

  return (
    <Router>
      <header>
        <nav>
          <menu className={classNameEntries}>
            <li>
              <Link to={indexPath}>
                <img src={logo} alt="Gifted Sounds Network logo" />
                <span>GIFTED SOUNDS</span>
              </Link>
            </li>
            <li className={loggedInClassNameEntries}><Link to={singleMediaPath}>Dashboard</Link></li>
            <li className={loggedInClassNameEntries}><Link to={uploadMediaPath}>Upload</Link></li>
            <li className={loggedInClassNameEntries}><Link to={adminPath}>All projects</Link></li>
          </menu>
        </nav>
      </header>

      <hr />

      <main>
        <UserContext.Provider value={providerValue}>
          <Routes>
              <Route path={singleMediaPath} element={ <UserSingleProject mediaId={mediaId} />} />
              <Route path={uploadMediaPath} element={ <UploadMedia />} />
              <Route path={adminPath} element={ <AllProjects />} />

              {/* All default routes */}
              <Route exact path={indexPath} element={ <Home /> } />
              <Route path="/*" element={ <Home />} />
          </Routes>
        </UserContext.Provider>
      </main>

      <footer>
        <strong>GSN Audio Review App</strong>
        {/*<!-- Social media links -->*/}
      </footer>
    </Router>
  );
}

export default App;
