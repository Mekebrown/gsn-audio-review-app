import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Open App" button', () => {
  render(<App />);

  const buttonElement = screen.getByText(/Open App/i);
  
  expect(buttonElement).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent(/Open App/i);
  expect(screen.getByRole('button')).not.toBeDisabled();
});

// test('has expected number of client-side routes', () => {

// });

// test('has redirect links working as expected', () => {
// // Every button click's link
// // Every a tag link?
// // Shows correct user data dependent upon the url params
// });
