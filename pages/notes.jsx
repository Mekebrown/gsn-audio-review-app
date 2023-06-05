import React from 'react';

export default function Notes({ content }) {
  return <div>
    <h1>Users</h1>
    {
        // Make a map of 
        content.maps((item) => {
            return <div key={item.id}>item #{item.id}</div>;
        })
    }
  </div>;
}

export async function getStaticProps() {
  // const { content } = await fetch('/api/notes').then((res) => res.json());
  const content = [ { id: 6 }, { id: 16 }, { id: 26 } ];

  return {
    props: {
      content,
    },
  };
}
