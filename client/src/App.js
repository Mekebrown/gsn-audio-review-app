import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Variables
import { indexPath, REACT_APP_FULL_TITLE } from "./components/tools/envs";

// General
import Index from "./components/Index"; 

// User
import UserSingleProject from "./components/User/UserSingleProject";

function App() {
  return (
    <div className="app">
      <header>
        {REACT_APP_FULL_TITLE}
      </header>
      <Router>
        <Routes>
          <Route index path={indexPath} element={<Index />} />
          <Route path="http://localhost:3001/usingle/:media_id" element={<UserSingleProject mediaId={1} />} />

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
