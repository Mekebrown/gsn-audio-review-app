import React from 'react';
import { useSession } from 'next-auth/react';

import analyticsService from '../lib/analytics';
import VisitorIndex from '../components/credentials/VisitorIndex';
import UserIndex from '../components/credentials/UserIndex';

analyticsService.logEvent('Index Page Viewed');

const Home = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    { !data ? <VisitorIndex /> : <UserIndex /> }
  </main>;
}

export default Home;
