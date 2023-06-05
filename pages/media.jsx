import React from 'react';

import analyticsService from '../lib/analytics';
import UserIndex from '../components/credentials/UserIndex';

analyticsService.logEvent('Media Page Viewed');

export default function Media(props) {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <UserIndex />
  </main>;
}

export async function getStaticProps() {
  // const { content } = await fetch('/api/media').then((res) => res.json());
  const content = [ { id: 6 }, { id: 16 }, { id: 26 } ];

  return {
    props: {
      content,
    },
  };
}
