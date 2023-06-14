import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import SignInOutBtn from "../components/credentials/SignInOutBtn";
import analytics from "../lib/analytics_handler";

analytics.gaEvent('Media Page Viewed');

export default function Media({content}) {
  const { data, status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }else if (status !== "authenticated") {
    window.location.href = "/";
    return null;
  }

  useEffect(() => {
    analytics.gaEvent('Media Page Loaded');
  }, []);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <SignInOutBtn data={data} />
    
    <p>Media View</p>
    I want to show:<br />
    <hr />
    {content.map(project => {
      return <div key={project.id}>
        THIS | Media project #{project.id}<br />
        SIDE | A player with preloaded audio of each media item<br />
        HAS | A preview of the latest note added to each media...<br />
        LOGO | Posted on 01/01/2023, 9:14 pm | 12 total notes | 2 total users<br />
        <hr />
      </div>;
    })}
  </main>;
};

export async function getStaticProps() {
  // const { content } = await fetch('/api/media').then((res) => res.json());
  const content = [ { id: 6 }, { id: 16 }, { id: 26 } ];

  return {
    props: {
      content,
    },
  };
}
