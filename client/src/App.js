import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Index from "./components/Index";
import Notes from "./components/Notes";
import Projects from "./components/Project/Projects";
import SingleProject from "./components/Project/SingleProject";
import Users from "./components/Users";

import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        Gifted Sounds Network
      </header>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Index />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/singleproject" element={<SingleProject />} />
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
