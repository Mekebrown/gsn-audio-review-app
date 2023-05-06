import React from 'react';

export default function MediaItem({ content }) {
  return <div>media #{content.id}</div>;
}

export async function getStaticProps(context) {
  // const { content } = await fetch('/api/media/:id').then((res) => res.json());
  const content = { id: 2 };

  return {
    props: {
      content,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: 
        { id: '1' } 
      }, 
      { params: 
        { id: '2' } 
      }
    ],
    fallback: false,
  };
}
