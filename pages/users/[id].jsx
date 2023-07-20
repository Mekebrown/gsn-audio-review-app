import React from 'react';

export default function User({ content }) {
  return <div>User #{content.id}</div>;
}

// TODO: Need to get every Profile for this User
export async function getStaticProps() {
  // const { content } = await fetch('/api/users/:id').then((res) => res.json());
  const content = { id: 6 };

  return {
    props: {
      content,
    },
  };
}
