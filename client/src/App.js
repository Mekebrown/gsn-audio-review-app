import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Users from "./components/Users";
import Notes from "./components/Notes";
import Index from "./components/Index";

import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        Gifted Sounds Network
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/notes" element={<Notes />} />
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
