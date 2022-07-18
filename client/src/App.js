import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { indexPath, REACT_APP_FULL_TITLE } from "./components/tools/envs";
import UserSingleProject from "./components/User/UserSingleProject";
import UploadMedia from "./components/Admin/UploadMedia";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link>  </li>
          <li><Link to="/usingle">Dashboard</Link></li>
        </ul>

        <hr />

        <Routes>
          <Route exact path={indexPath} element={ <UserSingleProject mediaId={1} /> } />
          <Route path="/usingle" element={<UserSingleProject mediaId={1} />} />
          <Route path="/admin/add-media" element={<UploadMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
