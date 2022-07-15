import React, { useState, useRef } from "react";
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
  const [key, setKey] = useState(null);
  const [adminEntry, setAdminEntry] = useState(false);

  const adminKey = useRef(null);

  const handleKeyEntry = () => { setKey(adminKey.current.value); };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (key === "gifted" || key === "Gifted") {
      setAdminEntry(true);
    }
  };

  const writeToFile = () => {
      let contents = {
          user_id: 1, 
          user_name: "lanceypooliciousness",
          email: "lanceypooliciousness@gmail.com",
          sess_id: "na",
          previous_cookie: "na",
          current_cookie : "na", 
          secret_item: "Bob for now", 
          secret_hint: "always", 
          visit_datetime: new Date(), 
          device: window.device, 
          ip_addr: window.ip,
          visit_length_sec: "Record somehow, when session is over?",
          is_sus: "Not sure how to determine this... location? login attempts?", 
          is_deleted: false, 
          role: 'admin', 
          creation_datetime: new Date("01-01-2022")
      };
  };

  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link>  </li>
          <li><Link to="/usingle/1">Dashboard</Link></li>
          {adminEntry && <li><Link to="/admin/add-media">Upload media</Link></li>}
        </ul>

        <hr />

        <Routes>
          <Route exact path={indexPath} element={
            <>
              <h2>{REACT_APP_FULL_TITLE}</h2>
              <UploadMedia />
              {/* {!adminEntry ? (<form onSubmit={handleFormSubmit} method="POST">
                <label htmlFor="key">
                  <input type="text" name="key" id="key" placeholder="Login key" ref={adminKey} onChange={handleKeyEntry} />
                </label>

                <label htmlFor="submit">
                  <input type="submit" name="submit" id="submit" value="Enter" />
                </label>
              </form>) : (
                <p>Welcome Lance</p>
              )} */}
            </>
          } />
          <Route path="/usingle/:mediaId" element={<UserSingleProject mediaId={1} />} />
          {adminEntry && (
            <>
            <Route path="/admin/add-media" element={<UploadMedia />} />
            <Route path="/media" element={<UploadMedia />} />
            </>)}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
