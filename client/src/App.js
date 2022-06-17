import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Variables
import { 
  adminPath,
  adminIndvlViewinglePath,
  allNotesPath,
  allProjectsPath,
  allUsersPath,
  indexPath,
  projectReviewingPath, 
  REACT_APP_FULL_TITLE,
  uploadMediaPath 
} from "./components/tools/envs";

// Admin
import AdminSingleProject from "./components/Admin/AdminSingleProject"; 
import Admin from "./components/Admin/Admin";
import UploadMedia from "./components/Admin/UploadMedia";
import Notes from "./components/Admin/Notes";
import Projects from "./components/Admin/AllProjects";

// General
import Index from "./components/Index"; 

// User
import UserSingleProject from "./components/User/UserSingleProject";
import Users from "./components/User/Users";

function App() {

  const LocationForHome = () => {
    if (process.env.NODE_ENV === 'production') { 
      return <UserSingleProject mediaId={1} />
    } else {
      return <Index />;
    }
  };

  return (
    <div className="app">
      <header>
        {REACT_APP_FULL_TITLE}
      </header>
      <Router>
        <Routes>
          <Route path={adminPath} element={<Admin />} />
          <Route path={adminIndvlViewinglePath} element={<AdminSingleProject />} />
          <Route path={uploadMediaPath} element={<UploadMedia />} />
          <Route path={allProjectsPath} element={<Projects />} />
          <Route index path={indexPath} element={<LocationForHome />} />
          <Route path={allNotesPath} element={<Notes />} />
          <Route path={projectReviewingPath + 1} element={<UserSingleProject mediaId={1} />} />
          <Route path={allUsersPath} element={<Users />} />
          
          {/* For non-existent routes */}
          <Route 
              path="*" 
              element={
                <main style={{padding: "1rem"}}>
                  <p>Please try again</p>
                </main>
              }
            ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
