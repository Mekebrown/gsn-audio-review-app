import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Admin
import AdminSingleProject from "./components/Projects_Oriented/Admin/AdminSingleProject"; 
import Admin from "./components/Admin";

// General
import Index from "./components/Index";
import Notes from "./components/Notes";
import Users from "./components/Users"; 

// Project
import UserSingleProject from "./components/Projects_Oriented/User/UserSingleProject";
import Projects from "./components/Projects_Oriented/AllProjects";

function App() {
  return (
    <div className="app">
      <header>
        Gifted Sounds Network
      </header>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/asingle" element={<AdminSingleProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Index />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/usingle" element={<UserSingleProject />} />
          <Route path="/users" element={<Users />} />
          
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
