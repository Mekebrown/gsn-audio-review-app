'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export async function generateMetadata() {
  return {
    title: "Error",
    description: "An error occurred while processing your request.",
  };
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Oops! Something went wrong.</h1>

      <p>
        {error.message || 'An unexpected error occurred.'}
      </p>
      
      {error.digest && (
        <p style={{ color: 'gray', fontSize: '0.9em' }}>
          Error Code: {error.digest}
        </p>
      )}
      
      <button
        onClick={reset}
        aria-label="Please reload the page and try again."
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Please reload the page and try again.
      </button>
    </div>
  );
}