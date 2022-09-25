import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import adminInfoNotesPath, {
  adminInfoUsersPath,
  adminSendDashPW,
  adminUploadPath,
  allMediaPath,
  contactPath,
  indexPath,
  loginPath,
  logoutPath,
  mediaId,
  noteId,
  reviewerId
} from "./components/tools/vars";
import Login from "./components/General/Login/Login";
import Logout from "./components/General/Logout";
import SingleMediaProject from "./components/General/SingleMediaProject/SingleMediaProject";
import AdminSingleNote from "./components/Admin/Modals/AdminSingleNote";
import AdminShowAllUsers from "./components/Admin/AdminShowAllUsers";
import AdminUploadMedia from "./components/Admin/AdminUploadMedia";
import AdminSendPW from "./components/Admin/Modals/AdminSendPW";
import AdminShowSingleUser from "./components/Admin/Modals/AdminShowSingleUser";
import AdminShowAllNotes from "./components/Admin/AdminShowAllNotes";
import ReviewerContactForm from "./components/Reviewer/ReviewerContactForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ReviewerDashboard from "./components/Reviewer/ReviewerDashboard";
import { useAuth } from "./components/tools/user-context/UserGlobalContextProvider";

/**
 * AudioPlayerOnly to be used inside of AllProjects and SingleMediaProject components
 * Notes to be used inside of AllProjects and SingleMediaProject components
 * AudioPlayerAndControls to be used inside of UserSingleProject component
 * NoteTaker to be used inside of UserSingleProject component
 * 
 * @returns {Node} App
 */
const App = () => {
  const { user } = useAuth();

  const [isSingleNoteModalOpen, setIsSingleNoteModalOpen] = useState(false);
  const [isSingleUserOpen, setIsSingleUserOpen] = useState(false);
  const [isSendPWOpen, setIsSendPWOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (document.getElementById("splasher")) { document.body.removeChild(document.getElementById("splasher")); }

  const Dashboard = () => {
    if (user !== undefined && user.user_role === "admin") {
      return <AdminDashboard />;
    } else if (user !== undefined && user.user_role === "reviewer") {
      return <ReviewerDashboard />;
    } else return <Login />;
  };

  return (
    <Router>
      <Routes>
        <Route exact path={loginPath} element={<Login />} />
        <Route path={logoutPath} element={<Logout />} />
        <Route path={indexPath} element={<Dashboard />} />
        <Route path={`${allMediaPath}/${mediaId}`} element={<SingleMediaProject mediaId={mediaId} />} />

        {/* ADMIN'S ROUTES */}
        <Route path={adminUploadPath} element={<AdminUploadMedia />} />
        <Route path={adminSendDashPW} element={<AdminSendPW open={isSendPWOpen} onClose={() => setIsSendPWOpen(false)} />} />
        <Route path={adminInfoUsersPath} element={<AdminShowAllUsers />} />
        <Route path={adminInfoNotesPath} element={<AdminShowAllNotes />} />
        <Route path={`${adminInfoNotesPath}/${noteId}`} element={<AdminSingleNote noteId={noteId} open={isSingleNoteModalOpen} onClose={() => { setIsSingleNoteModalOpen(false); }} />} />
        <Route path={`${adminInfoUsersPath}/${reviewerId}`} element={<AdminShowSingleUser userId={reviewerId} open={isSingleUserOpen} onClose={() => { setIsSingleUserOpen(false); }} />} />

        {/* USER'S REVIEWER ROUTES */}
        <Route path={contactPath} element={<ReviewerContactForm open={isContactModalOpen} onClose={() => { setIsContactModalOpen(false); }} />} />

        {/* FALLBACK */}{/* <Route path="/*" element={} /> */}
      </Routes>
    </Router>
  );
};

export default App;
