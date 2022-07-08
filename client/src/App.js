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

const App = () => {
  const [key, setKey] = useState(null);
  const [adminEntry, setAdminEntry] = useState(false);
  let adminKey = useRef(null);

  const handleKeyEntry = () => { setKey(adminKey.current.value); };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(key);

    if (key === "gifted") {
      setAdminEntry(true);
    }
  };

  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link>  </li>
          <li><Link to="/usingle/1">Dashboard</Link></li>
        </ul>

        <hr />

        <Routes>
          <Route exact path={indexPath} element={
            <>
              <h2>{REACT_APP_FULL_TITLE}</h2>
              
              {!adminEntry ? (<form onSubmit={handleFormSubmit} method="POST">
                <label htmlFor="key">
                  <input type="text" name="key" id="key" placeholder="Login key" ref={adminKey} onChange={handleKeyEntry} />
                </label>

                <label htmlFor="submit">
                  <input type="submit" name="submit" id="submit" value="Enter" />
                </label>
              </form>) : (
                <p>Welcome Lance</p>
              )}
            </>
          } />
          <Route path="/usingle/:mediaId" element={<UserSingleProject mediaId={1} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
