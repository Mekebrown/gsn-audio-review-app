import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { indexPath, singleMediaPath, uploadMediaPath, mediaId, adminPath } from "./components/tools/vars";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";
import Home from "./components/Home";
import AllProjects from "./components/Admin/AllProjects";
import { UserContext } from "./components/tools/helper_functions";

const App = () => {
  const [userId, setUserId] = useState(null);
  
  const providerValue = useMemo(() => ({userId, setUserId}), [userId, setUserId]);

  return (
    <Router>
      <ul>
        <li><Link to={indexPath}>Home</Link>  </li>
        {userId && <>
          <li><Link to={singleMediaPath}>Dashboard</Link></li>
          <li><Link to={uploadMediaPath}>Upload</Link>  </li>
          <li><Link to={adminPath}>All projects</Link></li>
          </>
        }
      </ul>

      <hr />

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
    </Router>
  );
}

export default App;
