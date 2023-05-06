import React from 'react';

export default function Users({ content }) {
  return <div>
    <h1>Users</h1>
    {
        content.maps((item) => {
            return <div key={item.id}>item #{item.id}</div>;
        })
    }
  </div>;
}

export async function getStaticProps() {
  // const { content } = await fetch('/api/users').then((res) => res.json());
  const content = [ { id: 6 }, { id: 16 }, { id: 26 } ];

  return {
    props: {
      content,
    },
  };
}
