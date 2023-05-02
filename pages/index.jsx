import React, { useContext } from 'react';

import analyticsService from '../lib/analytics';
import { AuthContext } from "../lib/context/AuthContext";

analyticsService.logEvent('Page Viewed');

const Home = () => {
  const { user } = useContext(AuthContext);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {!user ? (<>
      <h1>Entertaining Others the Way YOU Want</h1>

      <p>
        The Gifted Sounds Network's Audio Review App is a straightforward audio player and <br />notes taker that lets you give real-time feedback on your recordings. <br /><br />Since you're the primary visionary, we do as you say.
      </p>

      <button className="ml-[41%]" onClick={handleLogin}>
        Enter Your Given Password to Continue
      </button>
      
      <div id="portal"></div>
    </>) : (<>
      <p>Media View</p>
      I want to show:<br />
      <hr />
      THIS | Media project name<br />
      SIDE | A player with preloaded audio of each media item<br />
      HAS | A preview of the latest note added to each media...<br />
      LOGO | Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users<br />
      <hr />
      THIS | Media project name<br />
      SIDE | A player with preloaded audio of each media item<br />
      HAS | A preview of the latest note added to each media...<br />
      LOGO | Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users<br />
      <hr />
      THIS | Media project name<br />
      SIDE | A player with preloaded audio of each media item<br />
      HAS | A preview of the latest note added to each media...<br />
      LOGO | Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users<br />
      <hr />
      THIS | Media project name<br />
      SIDE | A player with preloaded audio of each media item<br />
      HAS | A preview of the latest note added to each media...<br />
      LOGO | Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users<br />
      <hr />
    </>)}
  </main>;
}

export default Home;
