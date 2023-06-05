import React from 'react';

export default function Note({ content }) {
  return <div>Note #{content.id}</div>;
}

export async function getStaticProps() {
  // const { content } = await fetch('/api/notes/:id').then((res) => res.json());
  const content = { id: 6 };

  return {
    props: {
      content,
    },
  };
}
