'use client';

import { usersExample } from '@/app/lib/user_placeholders';

export default function Page() {
  const thisClient = usersExample[1];

  return <section>
    <h1>Your Account</h1>
    <h2>Admin: Delete track/client account/note/project</h2>
    <div>Name: {thisClient.name}</div>
    <div>Package: {thisClient.package}</div>
    <div>Project(s): {thisClient.projects.join(', ')}</div>
  </section>;
};
