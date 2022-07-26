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
          <Route exact path={indexPath} element={ <UserSingleProject mediaId={mediaId} /> } />
          <Route path={singleMediaPath} element={ <UserSingleProject mediaId={mediaId} />} />
          <Route path={uploadMediaPath} element={ <UploadMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
