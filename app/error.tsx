'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <head>
        <title>Error</title>
      </head>
      <body>
        <main style={{ textAlign: 'center', marginTop: '20vh' }}>
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
            style={{
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            aria-label="Try again"
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}