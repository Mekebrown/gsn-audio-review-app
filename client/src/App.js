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

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link>  </li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>

        <hr />

        <Routes>
          <Route exact path={indexPath} element={<h2>{REACT_APP_FULL_TITLE}</h2>} />
          <Route path="/dashboard" element={<UserSingleProject mediaId={1} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
