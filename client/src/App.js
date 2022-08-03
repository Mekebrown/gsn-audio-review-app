import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { indexPath, singleMediaPath, uploadMediaPath, mediaId } from "./components/tools/envs";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to={indexPath}>Home</Link>  </li>
          <li><Link to={singleMediaPath}>Dashboard</Link></li>
        </ul>

        <hr />

        <Routes>
          <Route path={singleMediaPath} element={ <UserSingleProject mediaId={mediaId} />} />
          <Route path={uploadMediaPath} element={ <UploadMedia />} />
          {/* All default routes */}
          <Route exact path={indexPath} element={ <Home /> } />
          <Route path="/*" element={ <Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
