import React from 'react';
import { useSession } from 'next-auth/react';

import analyticsService from '../lib/analytics';
import VisitorIndex from '../components/credentials/VisitorIndex';
import ClientIndex from '../components/credentials/ClientIndex';

analyticsService.logEvent('Page Viewed');

const Home = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  console.log("Is there data? ", data);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    { !data ? <VisitorIndex /> : <ClientIndex /> }
  </main>;
}

export default Home;
