import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

import App from "./App";

/**
 * Unit and integration testing since all tests
 * need a running server to work
 * 
 * The goal of these tests is to find:
 * - Correct copy
 * - Click event outcomes
 * - Incorrect input errors shown
 * - Submit button redirects user to correct page
 */

describe("homepage functionality", () => {
  test('top bar navigation', () => {
    render(<App />);

    const uploadLink = screen.getByText(/Upload/i);
    const dashboardLink = screen.getByText(/Dashboard/i);
    const allProjectsLink = screen.getByText(/All projects/i);
    
    // Have to spoof this somehow:
    //      expect(submitBtn).not.toBeInTheDocument();
  });

  test('has expected number of client-side routes', () => {

  });

  test('has redirect links working as expected', () => {
  // Every button click's link
  // Every a tag link?
  // Shows correct user data dependent upon the url params
  });
});
