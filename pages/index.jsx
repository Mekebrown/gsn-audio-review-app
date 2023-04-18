import React, { useState } from 'react';
import analyticsService from '../lib/analytics';

const Home = () => {
  {/* Default Head with default <title> to be loaded in NavBar */}
  const [loggedIn, setLoggedIn] = useState(false);

  analyticsService.logEvent('Page Viewed');

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {!loggedIn ? (<>
      <h1>Entertaining Others the Way YOU Want</h1>

      <p>
        The Gifted Sounds Network's Audio Review App is a straightforward audio player and <br />notes taker that lets you give real-time feedback on your recordings. <br /><br />Since you're the primary visionary, we do as you say.
      </p>

      <button className="ml-[41%]" onClick={handleLogin}>
        Enter Your Given Password to Continue
      </button>
      
      <div id="portal"></div>
    </>) : (<>
      
    </>)}
  </main>;
}

export default Home;
