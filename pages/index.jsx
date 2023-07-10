import React from 'react';
import { useSession } from 'next-auth/react';

import SignInOutBtn from "../components/credentials/SignInOutBtn";
import analytics from  "../lib/analytics_handler";

analytics.gaEvent('Index Page Loaded');

const Home = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return "Loading..."
  }

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>Entertaining Others the Way YOU Want</h1>
  
    <p>
      The Gifted Sounds Network's Audio Review App is a straightforward audio player and notes taker that lets you give real-time feedback on your recordings. <br /><br />Since you're the primary visionary, we do as you say.
    </p>

    <SignInOutBtn data={session} />
  </main>;
}

export default Home;
