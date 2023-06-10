import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import SignInOutBtn from "../components/credentials/SignInOutBtn";
import analytics from  "../lib/analytics_handler";

const Home = () => {
  const { status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  if (status !== "unauthenticated") {
    window.location.href = "/media";
  }

  useEffect(() => {
    analytics.logEvent('Index Page Loaded');
  }, []);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>Entertaining Others the Way YOU Want</h1>
  
    <p>
      The Gifted Sounds Network's Audio Review App is a straightforward audio player and <br />notes taker that lets you give real-time feedback on your recordings. <br /><br />Since you're the primary visionary, we do as you say.
    </p>

    <SignInOutBtn />
  </main>;
}

export default Home;
